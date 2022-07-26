import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { FormItem } from 'src/app/interfaces/form';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterContentInit{

  @Input() type!:DataTypes;
  @Input() item!:any;
  @Input() fields!:FormItem[];

  @Output() change = new EventEmitter<{item:any,valid:boolean}>();
  @Output() save = new EventEmitter<{item:any}>();

  @ViewChildren(TemplateRef) defaultTemplates!:QueryList<TemplateRef<any>>;
  @ContentChildren(TemplateRef) customTemplates!:QueryList<TemplateRef<any>>;

  constructor(private appConfig:AppConfigService) { }

  ngAfterContentInit(): void {  setTimeout(()=>this.initFields()) }

  initFields(){

    const dataConfig = this.appConfig.dataConfig, customTemplates = this.customTemplates.toArray();

    this.item ||= dataConfig.getModel(this.type);

    this.fields.forEach((field)=> {
      
      field.columns ||= 12; 

      if(field.input == 'custom') {field.template = customTemplates.shift() as TemplateRef<any>;}
    
    });

    this.update();
  }

  setFields(data:any){ // se envian pares de llave/valor

   if(!(data instanceof Event)){ // evitar el error de enviar evento en vez de valor

      Object.keys(data).forEach((property:string)=>{
        
        this.appConfig.dataConfig.setValue(this.item, property, this.type, data[property]);
      
      });

      this.update(true);  
   }
  }

  update(notificate?:boolean){

    this.fields.forEach(field=>{

      field.valid = this.appConfig.dataConfig.validateProperty(this.item,field.name, this.type);
      
    });

    this.fields = [...this.fields];

    if(notificate) {
      
      this.change.emit({ 
      
        item:this.item, 
        valid:this.appConfig.dataConfig.validate(this.item,this.type)
      
      })
    }
  } 

  onSave(){   this.save.emit(this.item); }

 

}

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
  @Input() btnText?:string;

  @Output() change = new EventEmitter<{item:any,valid:boolean,changed?:any}>();
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

      this.update(true,data);  
   }
  }

  update(notificate?:boolean, value?:any){

    let names;

    this.fields.forEach(field=>{

      names = Array.isArray(field.name) ? field.name:[field.name];

      field.valid = names.every(name=>this.validateField(name))
      
    });

    this.fields = [...this.fields];

    this.item = [...this.item];

    if(notificate) {
      
      this.change.emit({ 
      
        item:this.item, 
        valid:this.appConfig.dataConfig.validate(this.item,this.type),
        changed:value
      
      })
    }    
  } 

  onSave(){  this.save.emit(this.item); }

  validateField(name:string){
    console.log(name)
    return this.appConfig.dataConfig.validateProperty(this.item,name, this.type);

  }

 

}

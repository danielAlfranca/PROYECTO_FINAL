import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { FormItem } from 'src/app/interfaces/form';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnChanges, AfterViewInit {

  @Input() field!:FormItem;
  @Input() item!:any;
  @Input() type!:DataTypes;

  @Output() change = new EventEmitter<any>()

  names!:string[];
  values!:any;
  title!:string;
  options?:{name:string, value?:string, selected?:boolean}[] = [];

  @ViewChildren(TemplateRef) templates!:QueryList<TemplateRef<any>>;

  template!:TemplateRef<any>;

  constructor(private appConfig:AppConfigService) { }

  ngOnChanges(): void { this.init(); }

  ngAfterViewInit(): void { setTimeout(() => { this.init();  }); }

  init(){     

    this.title ||= this.field.title;

    this.names ||= Array.isArray(this.field.name) ? this.field.name:[this.field.name];

    this.values = this.names.map(name=>this.appConfig.dataConfig.getValue(this.item,name,this.type) )

    console.log(this.names);
    
    this.options = this.field.options || [];

    if(this.templates && !this.template){

      const templates = this.templates.toArray();
  
      this.template = this.field.template || templates[[
        
        'text','number', 'select','array','time','itemPicker','dateTime', 'passengersList', 'activitiesList', 'roomsList','paxSalidaList'].findIndex(e=>e==this.field.input)];    
    }

    this.field = {...this.field}

  }


  update(value:any, index = 0){

    this.values[index] = value;

    this.change.emit(this.parseUpdate(this.values));
    
  }

  parseUpdate(values:any[]){

    return values.reduce((obj:any,val:any, index:number)=>({...obj,[this.names[index]]:val}),{})

  }

}

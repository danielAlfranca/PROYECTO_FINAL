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

  name!:string;
  value!:any;
  title!:string;
  touched!:boolean;
  options?:{name:string, value?:string, selected?:boolean}[] = [];

  @ViewChildren(TemplateRef) templates!:QueryList<TemplateRef<any>>;

  template!:TemplateRef<any>;

  constructor(private appConfig:AppConfigService) { }

  ngOnChanges(): void { this.init(); }

  ngAfterViewInit(): void { setTimeout(() => { this.init();  }); }

  init(){

   

    this.value = this.appConfig.dataConfig.getValue(this.item,this.name,this.type) || '';

    this.title ||= this.field.title;

    this.name ||= this.field.name;

    this.options = this.field.options || [];

    this.touched = this.field.touched as boolean

    if(this.templates && !this.template){

      const templates = this.templates.toArray();
  
      this.template = this.field.template || templates[['text','number', 'select','array','time','itemPicker'].findIndex(e=>e==this.field.input)];    
    }

    this.field = {...this.field}

  }


  update(value:any){

    this.value = value;

    this.change.emit({[this.name]:this.value});
    
  }

}

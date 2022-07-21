import { EventEmitter, TemplateRef } from "@angular/core";

export type InputsTypes = 'text'|'number'|'radio'|'checkbox'|'select'|'hidden'|'custom';

export interface FormField {

  name:string; 
  label?:string;
  placeholder?:string;  
  type:InputsTypes;
  options?:{name:string, value:string, selected?:boolean}
  template?:TemplateRef<any>;
  columns?:number
  
}

export interface FormStatus{

    model:FieldStatus, 
    fields:{[key:string]:FieldStatus}
  }
  
  export interface FieldStatus{
  
    valid:boolean,
    touched:boolean,
    errors:string[]
  }







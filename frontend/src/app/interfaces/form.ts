import { EventEmitter, TemplateRef } from "@angular/core";

export type InputsTypes = 'text'|'number'|'radio'|'checkbox'|'select'|'hidden'|'custom';

export interface FormItem{

  title:string,
  name:string,
  input:string,
  valid?:boolean,
  touched?:boolean,
  columns?: number,
  value?:any,
  options?:{name:string, value?:string, selected?:boolean}[]
  template:TemplateRef<any>;
}

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







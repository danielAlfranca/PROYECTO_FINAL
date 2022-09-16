import { FormItem } from "../interfaces/form";

export const operatorActivityForm = [
  {
    title:'Operador',
    name:'agent',
    input:'itemPicker',
    options:{listType:'empresa',propertyForDisplay:'nombre'}
  }
  
] as unknown as FormItem[];

export const operatorActivityTable = {

  title:'Operador',
  name:'operadores',
  dataType:'operadorActivity',
  data:[],
  columns:[

    {     
      title:'Empresa'
    }
  ],
  search:[]
};
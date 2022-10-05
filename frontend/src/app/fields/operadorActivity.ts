import { FormItem } from "../interfaces/form";

export const operatorActivityForm = [
  {
    title:'Operador',
    name:'proveedor',
    input:'itemPicker',
    options:{listType:'empresa',propertyForDisplay:'operator_name'}
  }, 
  {
    title:'Comentarios',
    name:'comments',
    input:'textArea',
   
  },
  
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
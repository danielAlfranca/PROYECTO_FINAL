import { FormItem } from "../interfaces/form";

export const guiadoActivityForm = [
  {
    title:'Guia',
    name:'agent',
    input:'itemPicker',
    options:{listType:'trabajador',propertyForDisplay:'full_name'}
  }
  
] as unknown as FormItem[];

export const guiadorActivityTable = {

  title:'Guaidos',
  name:'guiadoActivity',
  dataType:'guiadoActivity',
  data:[],
  columns:[
    {     
      title:'Servicio',
    },
    { 
      title:'Fechas'
    }
  ],
  search:[]
};
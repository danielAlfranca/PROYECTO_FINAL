import { FormItem } from "../interfaces/form";

export const restaurantActivityForm = [
  {
    title:'Restaurant',
    name:'agent',
    input:'itemPicker',
    options:{listType:'empresa',propertyForDisplay:'nombre'}
  }
  
] as unknown as FormItem[];

export const restaurantActivityTable = {

  title:'Restaurant',
  name:'restaurant',
  dataType:'restaurantActivity',
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
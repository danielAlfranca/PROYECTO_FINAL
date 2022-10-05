import { FormItem } from "../interfaces/form";

export const hotelActivityForm = [
  {
    title:'Hotel',
    name:'hotel',
    input:'itemPicker',
    options:{listType:'hotel',propertyForDisplay:'hotel_nombre'}
  },
  {
    title:'Fecha Inicio',
    name:'date_start',
    input:'dateTime'
  },
  {
    title:'Fecha Fin',
    name:'date_end',
    input:'dateTime'
  },
  {
    title:'Habitaciones',
    name:'habitaciones',
    input:'roomsList'
  }
  
] as FormItem[];

export const hotelActivityTable = {

  title:'Hoteles',
  name:'hoteles',
  dataType:'hotelActivity',
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
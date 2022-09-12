import { FormItem } from "../interfaces/form";

export const hotelActivityForm = [
  {
    title:'Hotel',
    name:'hotel_id',
    input:'itemPicker',
    options:{type:'hotel'}
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
    name:'rooms',
    input:'roomsList'
  },
] as FormItem[];

export const hotelActivityTable = {

  title:'Hoteles',
  name:'hoteles',
  dataType:'hotelActivity',
  data:[],
  columns:[

   {     
      title:'Hotel',
    },
    { 
      title:'Habitaciones'
    },
    { 
      title:'Fechas'   
    }
  ],
  search:[]
};
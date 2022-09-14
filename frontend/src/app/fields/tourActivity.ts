import { FormItem } from "../interfaces/form";

export const tourActivityForm = [
  
    {
      title:'Tour',
      name:'tour_id',
      input:'itemPicker',
      options:{listType:'tour',propertyForDisplay:'tour_name'}
    },
    {
      title:'Fecha Inicio',
      name:['date_start','time_start'],
      input:'dateTime'
    },
    {
      title:'Fecha Fin',
      name:['date_end','time_end'],
      input:'dateTime'
    },
    {
      title:'Pasajeros',
      name:'pax',
      input:'passengersList'
    },
    
] as FormItem[];

export const tourActivityTable = {

  title:'Tours',
  name:'tours',
  dataType:'tourActivity',
  data:[],
  columns:[

   {     
      title:'Nombre',
    },
    { 
      title:'Pasajeros'
    },
    { 
      title:'Fechas'   
    }
  ],
  search:[]
};
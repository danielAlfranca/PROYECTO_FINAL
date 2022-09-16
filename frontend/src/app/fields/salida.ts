import { FormItem } from "../interfaces/form";

export const salidaForm = [ // datos cliente
    {
      title:'Tour',
      name:'tour_id',
      input:'itemPicker',
      options:{listType:'tour',propertyForDisplay:'tour_name'}
    },
    {
      title:'Fecha Inicio',
      name:['date_start', 'time_start'],
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
      input:'text'
    },
    {
      title:'Servicios',
      name:'activities',
      input:'activitiesList'
    }

] as FormItem[];



export const salidaTable = {

  title:'Reservas',
  name:'reservas',
  dataType:'salida',
  data:[],
  columns:[

   { 
      title:'Tour',
      sort:'tour_name'
    },
    { 
      title:'Fechas',
      sort:'start_date'
    },
    { 
      title:'Operador',
      sort:'operator_name'
    },
   { 
      title:'Passengers'
    }
  ],
  search:[

    'name','surname', 'destination', 'date_start', 'date_end', 'provider_name'
  ]
};
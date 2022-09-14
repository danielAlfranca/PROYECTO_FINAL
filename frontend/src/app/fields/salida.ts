import { FormItem } from "../interfaces/form";

export const salidaForm = [ // datos cliente
    {
      title:'Nombre',
      name:'name',
      input:'text'
    },
    {
      title:'Apellidos',
      name:'surname',
      input:'text'
    },

    {
      title:'Telefonos',
      name:'phones',
      input:'array'
    },
    {
      title:'Emails',
      name:'emails',
      input:'array'
    },
    {
      title:'Proveedor',
      name:'provider_id',
      input:'itemPicker',
      options:{listType:'empresa',propertyForDisplay:'provider_name'}
    },

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
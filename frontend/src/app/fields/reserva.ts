import { FormItem } from "../interfaces/form";

export const reservaForm = [ // datos cliente
    {
      title:'Nombre',
      name:'nombre',
      input:'text'
    },
    {
      title:'Apellidos',
      name:'apellidos',
      input:'text'
    },

    {
      title:'Telefonos',
      name:'telefonos',
      input:'text'
    },
    {
      title:'Emails',
      name:'emails',
      input:'text'
    },
    {
      title:'Proveedor',
      name:'proveedor',
      input:'itemPicker',
      options:{listType:'empresa',propertyForDisplay:'provider_name'}
    },

] as FormItem[];

export const reservaForm2 = [ // datos paquete
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
    title:'Destino',
    name:'destino',
    input:'text'
  },
  {
    title:'Pasajeros',
    name:'pasajeros',
    input:'passengersList'
  }
 

]as FormItem[];

export const reservaTable = {

  title:'Reservas',
  name:'reservas',
  dataType:'reserva',
  data:[],
  columns:[

   { 
      title:'Nombre',
      sort:'nombre'
    },
    { 
      title:'Paquete',
      sort:'destino'
    },
    { 
      title:'Fechas',
      sort:'date_start'
    },
   { 
      title:'Proveedor',
      sort:'provider_name'
    }
  ],
  search:[

    'nombre','apellidos', 'destino', 'date_start', 'date_end', 'provider_name', 'passengers_list','telefonos','emails'
  ]
};
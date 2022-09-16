import { FormItem } from "../interfaces/form";

export const reservaForm = [ // datos cliente
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
    name:'destination',
    input:'text'
  },
  {
    title:'Pasajeros',
    name:'pax',
    input:'passengersList'
  },
  {
    title:'Actividades',
    name:'activities',
    input:'activitiesList'
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
      sort:'name'
    },
    { 
      title:'Paquete',
      sort:'destination'
    },
    { 
      title:'Fechas',
      sort:'date_start'
    },
   { 
      title:'Proveedor',
    }
  ],
  search:[

    'name','surname', 'destination', 'date_start', 'date_end', 'provider_name'
  ]
};
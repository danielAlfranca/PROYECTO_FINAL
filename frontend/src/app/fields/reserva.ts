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
      name:'provider',
      input:'itemPicker',
      options:{type:'empresa'}
    },

] as FormItem[];

export const reservaForm2 = [ // datos paquete
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
    title:'Destino',
    name:'destination',
    input:'text'
  },
  {
    title:'Passengers',
    name:'pax',
    input:'array'
  },
  {
    title:'Services',
    name:'emails',
    input:'array'
  }

]as FormItem[];

export const reservaForm3 = [
 ];

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
      title:'Precio',
    },
    { 
      title:'Proveedor',
    }
  ],
  search:[

    'name','surname', 'destination', 'date_start', 'date_end'
  ]
};
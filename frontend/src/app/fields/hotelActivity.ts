import { FormItem } from "../interfaces/form";

export const reservaForm = [
    {
      title:'Nombre',
      name:'nombre',
      input:'text'
    },
    {
      title:'Documento',
      name:'documento',
      input:'text'
    },
    {
      title:'Direccion',
      name:'direccion',
      input:'text'
    },
    {
      title:'Telefonos',
      name:'telefonos',
      input:'array'
    },
    {
      title:'Emails',
      name:'emails',
      input:'array'
    }
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
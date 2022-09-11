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
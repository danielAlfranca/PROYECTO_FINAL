import { FormItem } from "../interfaces/form";

export const passengerForm = [ // datos cliente
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
      title:'Pasajeros',
      name:'pasajeros',
      input:'passengersList'
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
    }   

] as FormItem[];

export const passengerTable = {

  title:'Pasajeros',
  name:'pasajeros',
  dataType:'passenger',
  data:[],
  columns:[

   { 
      title:'Nombre',
      sort:'full_name'
    },
    { 
      title:'Fecha',      
    },
    { 
        title:'Salida Programada'       
    },
   
  ],
  search:[

    'full_name','passengers_list','date_start'
  ]
};
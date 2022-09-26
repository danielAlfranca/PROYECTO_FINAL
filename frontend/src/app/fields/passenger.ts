import { FormItem } from "../interfaces/form";

export const passengerForm = [ // datos cliente
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
      title:'Pasajeros',
      name:'pax',
      input:'passengersList'
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

    'full_name','pax_list','date_start'
  ]
};
import { FormItem } from "../interfaces/form";

export const empresaForm = [
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

export const empresaTable = {

  title:'Empresas',
  name:'empresas',
  dataType:'empresa',
  data:[],
  columns:[

   { 
      title:'Nombre',
      sort:'nombre'
    },
    { 
      title:'Documento',
      sort:'documento'
    },
    { 
      title:'Direccion',
      sort:'direccion'
    },
    { 
      title:'Contacto',
    }
  ],
  search:[

    'nombre','documento', 'lista_emails', 'direccion', 'lista_telefonos'
  ]
};
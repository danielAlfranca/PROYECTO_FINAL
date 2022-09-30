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
      input:'text'
    },
    {
      title:'Emails',
      name:'emails',
      input:'text'
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
      title:'Contacto',
    }
  ],
  search:[

    'nombre','documento', 'emails', 'direccion', 'telefonos'
  ]
};

export const empresaTable2 = {

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
      title:'Contacto'
    }
  ],
  search:[

    'nombre','documento', 'lista_emails', 'direccion', 'lista_telefonos'
  ]
};
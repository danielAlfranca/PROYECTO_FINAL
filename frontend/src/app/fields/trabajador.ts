import { FormItem } from "../interfaces/form";

export const trabajadorForm =  [

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
      title:'documento',
      name:'documento',
      input:'text',
    },
    {
      title:'tipo',
      name:'tipo',
      input:'select',
      options:[{name:'guia', value:1},{name:'chofer', value:2},{name:'administrativo', value:3}],
    },
    {
      title:'regimen',
      name:'regimen',
      input:'select',
      options:[{name:'en plantilla', value:1},{name:'autonomo', value:2}],
    },
    {
      title:'telefonos',
      name:'telefonos',
      input:'text'
    },
    {
      title:'emails',
      name:'emails',
      input:'text'
    }    

  ] as FormItem[];

export const trabajadorTable = {

    title:'Trabajadores',
    name:'trabajadores',
    dataType:'trabajador',
    data:[],
    columns:[

     { 
        title:'Nombre',
        sort:'nombre_completo'
      },
      { 
        title:'Documento',
        sort:'documento'
      },
      { 
        title:'Tipo',
        sort:'tipo'
      },    

    ],
    search:[

      'nombre','documento', 'lista_emails', 'lista_telefonos', 'tipo' , 'regimen'
    ]
  };
import { FormItem } from "../interfaces/form";

export const trabajadorForm =  [

    {
      title:'Nombre',
      name:'nombre',
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
      options:[{name:'guia'},{name:'chofer'},{name:'administrativo'}],
    },
    {
      title:'regimen',
      name:'regimen',
      input:'select',
      options:[{name:'en plantilla'},{name:'autonomo'}],
    },
    {
      title:'telefonos',
      name:'telefonos',
      input:'array'
    },
    {
      title:'emails',
      name:'emails',
      input:'array'
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
      { 
        title:'Contacto',
        name:'contacto'
      },

    ],
    search:[

      'nombre','documento', 'lista_emails', 'lista_telefonos', 'tipo' , 'regimen'
    ]
  };
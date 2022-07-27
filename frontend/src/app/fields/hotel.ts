import { FormItem } from "../interfaces/form";

export const hotelForm =  [

    {
      title:'Nombre',
      name:'nombre',
      input:'text'
    },
    {
      title:'Tipo',
      name:'tipo',
      input:'select',
      options:[{name:'hotel'},{name:'lodge'},{name:'alojamiento'}]
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
      name:'telefonos',
      input:'array'
    },
    {
      title:'Propietario',
      name:'propietario',
      input:'itemPicker',
      options:{type:'empresa'}
    }

  ] as FormItem[];

export const hotelTable = {

    title:'Hoteles',
    name:'hoteles',
    dataType:'hotel',
    data:[],
    columns:[

     { 
        title:'Nombre',
        sort:'nombre'
      },
      { 
        title:'Tipo',
        sort:'tipo'
      },
      { 
        title:'direccion',
        sort:'direccion'
      },
      { 
        title:'contacto',
      },
      { 
        title:'Empresa asociada',
        sort:'nombre_propietario'
      }

    ],
    search:[

      'nombre', 'direccion', 'estrellas', 'tipo' ,'nombre_propietario' ,'lista_emails','lista_telefonos'
    ]
  };
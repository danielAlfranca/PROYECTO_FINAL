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
      options:[{name:'hotel', value:1},{name:'lodge', value:2},{name:'alojamiento', value:3}]
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
    },
    {
      title:'Propietario',
      name:'propietario',
      input:'itemPicker',
      options:{listType:'empresa',propertyForDisplay:'propietario_nombre'}
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
        title:'contacto',
      },
      { 
        title:'Empresa asociada',
        sort:'nombre_propietario'
      }

    ],
    search:[

      'nombre', 'direccion', 'categoria', 'tipo' ,'nombre_propietario' ,'emails','telefonos'
    ]
  };
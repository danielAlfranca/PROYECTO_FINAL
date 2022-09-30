import { FormItem } from "../interfaces/form";

export const tourForm =   [

    {
      title:'Nombre',
      name:'nombre',
      input:'text'
    },
    {
      title:'inicio',
      name:'inicio',
      input:'time',
      columns:6,
    },
    {
      title:'fin',
      name:'fin',
      input:'time',
      columns:6,
    },
    {
      title:'duracion',
      name:'duracion',
      input:'number'
    },
    {
      title:'destino',
      name:'destino',
      input:'text'
    }    

  ] as FormItem[];

export const tourTable = {

    title:'Tours',
    name:'tours',
    dataType:'tour',
    data:[],
    columns:[

     { 
        title:'Nombre',
        sort:'nombre'
      },
      { 
        title:'Destino',
        sort:'destino'
      },
      { 
        title:'horario',
       
      }       

    ],
    search:[

      'nombre','destino', 'inicio','fin'
    ]
  };;
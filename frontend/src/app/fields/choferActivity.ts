import { FormItem } from "../interfaces/form";

export const choferActivityForm = [
  {
    title:'Chofer',
    name:'agent',
    input:'itemPicker',
    options:{listType:'trabajador',propertyForDisplay:'full_name'}
  }
  
] as unknown as FormItem[];

export const choferActivityTable = {

  title:'Chofers',
  name:'chofers',
  dataType:'choferActivity',
  data:[],
  columns:[

    {     
      title:'Chofer'
    },
    {     
      title:'tipo'
    }
  ],
  search:[]
};
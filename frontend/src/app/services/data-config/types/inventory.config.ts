import { DataService } from "../../data-queries/data.service";
import { DataConfig  } from "./model";



export class InventoryConfig extends DataConfig{

    protected override readonly keys ={

        // MAIN KEYS

        id:{
            private:0, 
            validations:['valid_index'], 
            required:true,
        },
        agent:{

            private:1, 
            validations:['agent_exists'], 
            required:true,
        }, 
        type:{

            private:2, 
            validations:['valid_inventory_type'], 
            required:true,
        },
        data:{

            private:3, 
            validations:['valid_inventory_data'], 
            required:true,
        },
        hidden:{

            private:4, 
            validations:['is_boolean'], 
            required:true,
        }, 
        
        // SECONDARY KEYS

        is_empresa:{  getter:(obj:any)=>this.getValue(obj,'type') == 1 },

        is_tour:{ getter:(obj:any)=> this.getValue(obj,'type') == 4 },

        is_hotel:{ getter:(obj:any)=> this.getValue(obj,'type') == 3},

        is_paquete:{ getter:(obj:any)=>this.getValue(obj,'type') == 5 },

        is_trabajador:{ getter:(obj:any)=> this.getValue(obj,'type') == 2 },
    }

    protected override validations:{[key:string]:(obj:any, key:string)=>boolean}= {

        ...super.validations,
        valid_inventory_type: (obj:any, key:string) => typeof obj[key] == 'number' && [1,2,3,4,5].includes(obj[key]),
        valid_inventory_data: (obj:any, key:string) => this.validInventoryData(obj,key),

    };

    constructor(private dataQueries:DataService){ super();  }


    private validInventoryData(obj:any, key:string){

       const type = this.getValue(obj,"type"), data = this.getValue(obj,"data");

       switch (Number(type)) {

        case 1: return this.validEmpresaData(data);

        case 2: return this.validTrabajadorData(data);

        case 3: return this.validHotelData(data);

        case 4: return this.validTourData(data);
        
        case 5:return this.validPaqueteData(data);

        default: return false;

       }
      
    }

    private validEmpresaData(data:any){

        return Array.isArray(data) && 
            
        typeof data[0] == 'string' && // name 

        (!data[1] || typeof data[1] == 'string') && // doc 

        (!data[2] || typeof data[2] == 'string') && // address 

        (!data[3] ||  data[3].every((e:any)=> typeof e == 'string') ) && // phones 

        (!data[4] ||  data[4].every((e:any)=> typeof e == 'string') )  // emails         
    }

    private validTrabajadorData(data:any){

        return Array.isArray(data) && 
            
        typeof data[0] == 'string' && // name 

        (!data[1] || typeof data[1] == 'string') && // doc 

        (!data[2] || typeof data[2] == 'string') && // address 

        (!data[3] ||  data[3].every((e:any)=> typeof e == 'string') ) && // phones 

        (!data[4] ||  data[4].every((e:any)=> typeof e == 'string') )  // emails         
    }

    private validHotelData(data:any){

        return Array.isArray(data) && 
            
        typeof data[0] == 'string' && // name 

        [1,2,3].includes(data[1]) && // type 

        data[1] != 1 || [1,2,3,4,5].includes(data[2])  && // categoria - si es hotel tiene que tener estrellas 

        (true ) && // servicios - FALTA

        (!data[4] ||  typeof data[4] == 'string' )  // address         
    }

    private validTourData(data:any){

        return Array.isArray(data) && 
            
        typeof data[0] == 'string' && // name 

        ( data[1] == 'string') && // HORARIO INICIO FALTA!!!!

        ( data[2] == 'string') && // HORARIO FIN FALTA!!!

        (typeof data[3] == 'number' ) && // duracion 

        (data[4] == 'string' )  // destino         
    }

    private validPaqueteData(data:any){

        return Array.isArray(data) && 
            
        typeof data[0] == 'string' && // name 

        typeof data[1] == 'number' && // duracion 

        typeof data[2] == 'string' && // destino 

       (true)   // SERVICIOS FALTAN!!!!!         
    }




}
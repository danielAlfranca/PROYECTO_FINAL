import { DataService } from "../../data-queries/data.service";
import { DataConfig  } from "./model";



export class EmpresaConfig extends DataConfig{

    protected override readonly keys ={

        id:{
            private:0, 
            validations:['valid_index'], 
            required:true,
        },
        agent:{

            private:1, 
            validations:['reference_exists', 'is_agent'], 
            required:true,
        }, 
        agente:{

            private:2, 
            validations:['reference_exists', 'is_agent'], 
            required:true,
        }                      
    }
    constructor(private dataQueries:DataService){

        super();
       
    }

}
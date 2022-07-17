import { DataService } from "../../data-queries/data.service";
import { DataConfig  } from "./model";



export class EmpresaConfig extends DataConfig{

    protected override readonly keys ={

        id:{
            private:0, 
            validations:['valid_index'], 
            required:true,
        },
        nombre:{

            private:1, 
            validations:['string'], 
            required:true,
        }, 
        agente:{

            private:2, 
            validations:['reference_exists', 'is_agent'], 
            required:true,
        }                      
    }
    constructor(dataQueries:DataService){

        super();
        this.dataQueries = dataQueries;
    }

}
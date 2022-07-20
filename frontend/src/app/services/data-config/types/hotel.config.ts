import { Injectable } from "@angular/core";
import { DataService } from "../../data-queries/data.service";
import { InventoryConfig } from "../models/inventory";
import { DataConfig } from "../models/data-config";

@Injectable({
    providedIn: 'root' 
})

export class HotelConfig extends DataConfig{

    protected override readonly keys:any = {

        ...InventoryConfig.keys,

        nombre:{ 
            
            private:InventoryConfig.keys.data.private+'.0', 
            validations:['is_string'], 
            required:true,        
        },
        tipo:{ 
            
            private:InventoryConfig.keys.data.private+'.1', 
            validations:['is_string'], 
            required:false,        
        },
        propietario:{ 
            
            private:InventoryConfig.keys.agent.private, 
            //validations:(), 
            required:false,        
        },
        categoria:{ 
            
            private:InventoryConfig.keys.data.private+'.2', 
            //validations:(), 
            required:false,        
        },
       
        nombre_tipo:{ 
            
            getter:(obj:any)=>  this.getValue(obj, 'is_hotel')    ?   'hotel' :    
                                this.getValue(obj, 'is_lodge')    ?   'lodge' : 
                                this.getValue(obj, 'is_alojamiento')    ?   'alojamiento' :  false  
        },
        
        is_hotel:{ getter:(obj:any)=> this.getValue(obj,'type') == 1 },

        is_lodge:{ getter:(obj:any)=> this.getValue(obj,'type') == 2 },

        is_alojamiento:{ getter:(obj:any)=> this.getValue(obj,'type') == 3 },

        nombre_propietario:{ 
            
            getter:(obj:any)=> 'FALTA'     
        }

    }
    
    constructor(){ super(); }

    protected override validations = {

        ...super.validations,
        ...InventoryConfig.validations,        

    }

}
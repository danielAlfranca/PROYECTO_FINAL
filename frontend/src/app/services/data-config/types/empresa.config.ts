import { Injectable, Injector } from "@angular/core";
import { DataService } from "../../data-queries/data.service";
import { InventoryConfig } from "../models/inventory";
import { DataConfig } from "../models/data-config";

@Injectable({
    providedIn: 'root' 
  })
export class EmpresaConfig extends DataConfig{

    protected override readonly keys:any = {

        nombre:{ 
            
            private:InventoryConfig.keys.data.private+'.0', 
            validations:['is_string'], 
            required:true,        
        },
        documento:{ 
            
            private:InventoryConfig.keys.data.private+'.1', 
            validations:['is_string'], 
            required:false,        
        },
        telefonos:{ 
            
            private:InventoryConfig.keys.data.private+'.3', 
            //validations:(), 
            required:false,        
        },
        emails:{ 
            
            private:InventoryConfig.keys.data.private+'.4', 
            //validations:(), 
            required:false,        
        },
        direccion:{ 
            
            private:InventoryConfig.keys.data.private+'.2', 
            validations:['is_string'], 
            required:false,        
        },
        lista_telefonos:{ 
            
            getter:(obj:any)=>(this.getValue(obj,'telefonos')|| [] ).join(', ')          
        },
        lista_emails:{ 
            
            getter:(obj:any)=>(this.getValue(obj,'emails')|| [] ).join(', ')        
        }
    }

    protected override validations = {

        ...super.validations,
        ...InventoryConfig.validations,        

    }
    constructor(protected override injector:Injector){ super(injector); }

}
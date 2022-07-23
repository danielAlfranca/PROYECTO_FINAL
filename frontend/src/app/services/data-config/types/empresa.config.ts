import { Injectable, Injector } from "@angular/core";
import { DataService } from "../../data-queries/data.service";
import { InventoryConfig } from "../models/inventory";
import { DataConfig } from "../models/data-config";

@Injectable({
    providedIn: 'root' 
  })
export class EmpresaConfig extends DataConfig{

    protected override readonly keys:any = {

        id:{
            private:0, 
            validations:['valid_index'], 
            required:true,
        },
        agent:{

            private:1, 
            validations:['valid_agent'], 
            required:true,
            setter:(obj:any, value:any)=>false // solo asignable desde servidor aunque presente aqui para busquedas por referencia
        }, 
        type:{

            private:2, 
            validations:['valid_inventory_type'], 
            required:true,
        },
        nombre:{ 
            
            private:'3.0', 
            validations:['is_string'], 
            required:true,        
        },
        documento:{ 
            
            private:'3.1', 
            validations:['is_string'], 
            required:false,        
        },
        telefonos:{ 
            
            private:'3.3', 
            validations:['is_string_array'], 
            required:false,        
        },
        emails:{ 
            
            private:'3.4', 
            validations:['is_string_array'], 
            required:false,        
        },
        direccion:{ 
            
            private:'3.2', 
            validations:['is_string'], 
            required:false,        
        },
        hidden:{

            private:4, 
            validations:['is_boolean'], 
            required:true,
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
        valid_inventory_type: (obj:any, key:string) => obj[key] == 1,
        valid_agent:(obj:any, key:string) => this.valid_agent(obj)     

    }
    constructor(protected override injector:Injector){ super(injector); }

    public override valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        // como hay otros objetos de inventario con la misma estructura primero siempre comprobar que sea una empresa

       if(!this.validations.valid_inventory_type(obj,'type')) return false

       return super.valueIsValid(obj,key)
    }

    public override getModel() {
        
        const model = ['nuevo',null,1,[],false]

        return [...model]
    }

    private valid_agent(obj:any){

        const agent = this.getValue(obj,'agent');
        return (this.getValue(obj,'id') == 'nuevo' && agent === null) || typeof agent == 'number';
    }


}
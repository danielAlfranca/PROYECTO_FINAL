import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../models/data-config";

@Injectable({
    providedIn: 'root' 
  })

export class TourConfig extends DataConfig{

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
        inicio:{ 
            
            private:'3.1', 
            validations:['is_string'], 
            required:false,        
        },
        fin:{ 
            
            private:'3.2', 
            validations:['is_string'], 
            required:false,        
        },
        duracion:{ 
            
            private:'3.3', 
            validations:['is_number'], 
            required:false,        
        },
        destino:{ 
            
            private:'3.4', 
            validations:['is_string'], 
            required:false,        
        },
        horario_completo:{ 
            
            getter:(obj:any)=>{

                const   inicioFin = [this.getValue(obj, 'inicio') ,this.getValue(obj, 'fin')].join(' - '),
                        duracion = this.getValue(obj, 'duracion');

                return inicioFin + (duracion && duracion> 1 ? ' ( +'+(duracion-1)+')':'' );
            }     
        }
    }
    
    constructor(protected override injector:Injector){ super(injector); }

    protected override validations = {

        ...this.common_validations,
        valid_inventory_type: (obj:any, key:string) => this.getValue(obj,key) == 2, 
        valid_agent:(obj:any, key:string) => this.getValue(obj,key) == 1      

    }
    public override getModel() {
        
        const model = ['nuevo',1,4,[],false];

        return [...model]
    }

}
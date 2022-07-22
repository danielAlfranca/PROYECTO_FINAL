import { Injectable, Injector } from "@angular/core";
import { DataService } from "../../data-queries/data.service";
import { InventoryConfig } from "../models/inventory";
import { DataConfig } from "../models/data-config";

@Injectable({
    providedIn: 'root' 
  })

export class TourConfig extends DataConfig{

    protected override readonly keys:any = {

        ...InventoryConfig.keys,

        nombre:{ 
            
            private:InventoryConfig.keys.data.private+'.0', 
            validations:['is_string'], 
            required:true,        
        },
        inicio:{ 
            
            private:InventoryConfig.keys.data.private+'.1', 
            validations:['is_string'], 
            required:false,        
        },
        fin:{ 
            
            private:InventoryConfig.keys.data.private+'.2', 
            //validations:(), 
            required:false,        
        },
        duracion:{ 
            
            private:InventoryConfig.keys.data.private+'.3', 
            //validations:(), 
            required:false,        
        },
        destino:{ 
            
            private:InventoryConfig.keys.data.private+'.4', 
            //validations:(), 
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

        ...super.validations,
        ...InventoryConfig.validations,        

    }
    public override getModel() {
        
        return InventoryConfig.defaultModel()
    }

}
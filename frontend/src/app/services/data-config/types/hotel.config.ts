import { Injectable, Injector } from "@angular/core";
import { InventoryConfig } from "../models/inventory";
import { DataConfig } from "../models/data-config";
import { DataService } from "../../data-queries/data.service";
import { DataConfigService } from "../data-config.service";

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
        direccion:{ 
            
            private:InventoryConfig.keys.data.private+'.4', 
            //validations:(), 
            required:false,        
        },
       
        nombre_tipo:{ 
            
            getter:(obj:any)=>  this.getValue(obj, 'is_hotel')    ?   'hotel' :    
                                this.getValue(obj, 'is_lodge')    ?   'lodge' : 
                                this.getValue(obj, 'is_alojamiento')    ?   'alojamiento' :  false  
        },
        estrellas:{ 
            
            getter:(obj:any)=>  {

                const tipo = this.getValue(obj,'nombre_tipo'), categoria = this.getValue(obj,'categoria');

                if(tipo!='hotel' || !categoria) return '';

                return new Array(categoria).fill('*').join()
            } 
        },

        tipo_categoria:{ 
            
            getter:(obj:any)=>  {

                const tipo = this.getValue(obj,'nombre_tipo')

                return tipo + (tipo=='hotel' ? '(' + this.getValue(obj,'estrellas')+')':'')
            } 
        },
        
        is_hotel:{ getter:(obj:any)=> this.getValue(obj,'type') == 1 },

        is_lodge:{ getter:(obj:any)=> this.getValue(obj,'type') == 2 },

        is_alojamiento:{ getter:(obj:any)=> this.getValue(obj,'type') == 3 },

        nombre_propietario:{  getter:(obj:any)=> {

            const propietarioRef = this.getValue(obj,'propietario'),
                  empresa = this.find('empresa',propietarioRef);

            return this.read(empresa,'nombre','empresa');
        } }

    }
    
    constructor(protected override injector:Injector){ super(injector); }

    protected override validations = {

        ...super.validations,
        ...InventoryConfig.validations,        

    }

}
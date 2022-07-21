import { InventoryConfig } from "../models/inventory";
import { DataConfig } from "../models/data-config";
import { Injectable, Injector } from "@angular/core";

@Injectable({
    providedIn: 'root' 
  })

export class TrabajadorConfig extends DataConfig{

    protected override readonly keys:any = {

        ...InventoryConfig.keys,

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
            
            private:InventoryConfig.keys.data.private+'.2', 
            //validations:(), 
            required:false,        
        },
        emails:{  
            
            private:InventoryConfig.keys.data.private+'.3', 
            //validations:(), 
            required:false,        
        },
        tipo:{ 
            
            private:InventoryConfig.keys.data.private+'.4', 
            //validations:(), 
            required:false,        
        },
        regimen:{ 
            
            private:InventoryConfig.keys.data.private+'.5', 
            //validations:(), 
            required:false,        
        },
        nombre_completo:{ 
            
            getter:(obj:any)=>(this.getValue(obj,'nombre')|| [] ).split(',').join("")          
        },
        lista_telefonos:{ 
            
            getter:(obj:any)=>(this.getValue(obj,'telefonos')|| [] ).join(', ')          
        },
        lista_emails:{ 
            
            getter:(obj:any)=>(this.getValue(obj,'emails')|| [] ).join(', ')        
        },

        nombre_tipo:{ getter:(obj:any)=>{

            return  this.getValue(obj, 'es_guia')            ?   'guia' :
                    this.getValue(obj, 'es_chofer')          ?   'chofer' :
                    this.getValue(obj, 'es_administrativo')  ?   'administrativo' : false;
        }},

        nombre_regimen:{ getter:(obj:any)=>{

            return  this.getValue(obj, 'esta_en_plantilla')      ?   'en plantilla' :
                    this.getValue(obj, 'es_autonomo')            ?   'autonomo' :false;
        }},

        es_guia:{ getter:(obj:any)=>(this.getValue(obj, 'tipo') == 1 ) },

        es_chofer:{ getter:(obj:any)=>(this.getValue(obj, 'tipo') == 2 ) },

        es_administrativo:{ getter:(obj:any)=>(this.getValue(obj, 'tipo') == 3 ) },
        
        esta_en_plantilla:{ getter:(obj:any)=>(this.getValue(obj, 'regimen') == 1 ) },

        es_autonomo:{ getter:(obj:any)=>(this.getValue(obj, 'regimen') == 2 ) }, 
    }
    
    constructor(protected override injector:Injector){ super(injector); }

    protected override validations = {

        ...super.validations,
        ...InventoryConfig.validations
    }

}
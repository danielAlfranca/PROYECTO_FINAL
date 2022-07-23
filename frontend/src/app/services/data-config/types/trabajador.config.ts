import { InventoryConfig } from "../models/inventory";
import { DataConfig } from "../models/data-config";
import { Injectable, Injector } from "@angular/core";

@Injectable({
    providedIn: 'root' 
  })

export class TrabajadorConfig extends DataConfig{

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
            
            private:'3.2', 
            validations:['is_string_array'], 
            required:false,        
        },
        emails:{  
            
            private:'3.3', 
            validations:['is_string_array'], 
            required:false,        
        },
        tipo:{ 
            
            private:'3.4', 
            validations:['is_valid_trabajador_tipo'], 
            required:false,  
            getter:(obj:any)=>{

                return  this.getValue(obj, 'es_guia')            ?   'guia' :
                        this.getValue(obj, 'es_chofer')          ?   'chofer' :
                        this.getValue(obj, 'es_administrativo')  ?   'administrativo' : false;      
            },
            setter: (obj: any, value: any) => { // EL VALOR ESPERADO PARA INTRODUCIR ES UN OBJETO EMPRESA

                const key = this.keys.tipo, index = ['guia','chofer','administrativo'].findIndex(e=>e==value);
                
                if(index==-1) return false;

                return Boolean(this.setByPath(obj,key,index+1)); 
            },
        },
        regimen:{ 
            
            private:'3.5', 
            validations:['is_valid_regimen'], 
            required:false,
            getter:(obj:any)=>{

                return  this.getValue(obj, 'esta_en_plantilla')      ?   'en plantilla' :
                        this.getValue(obj, 'es_autonomo')            ?   'autonomo' :false;
            },
            setter: (obj: any, value: any) => { // EL VALOR ESPERADO PARA INTRODUCIR ES UN OBJETO EMPRESA

                const key = this.keys.tipo, index = ['en plantilla','autonomo'].findIndex(e=>e==value);
                
                if(index==-1) return false;

                return Boolean(this.setByPath(obj,key,index+1)); 
            },        
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

        es_guia:{ getter:(obj:any)=>(this.getByPath(obj,this.keys.tipo) == 1 ) },

        es_chofer:{ getter:(obj:any)=>(this.getByPath(obj,this.keys.tipo) == 2 ) },

        es_administrativo:{ getter:(obj:any)=>(this.getByPath(obj,this.keys.tipo)  == 3 ) },
        
        esta_en_plantilla:{ getter:(obj:any)=>(this.getByPath(obj,this.keys.regimen)  == 1 ) },

        es_autonomo:{ getter:(obj:any)=>(this.getByPath(obj,this.keys.regimen)  == 2 ) }, 
    }
    
    constructor(protected override injector:Injector){ super(injector); }

    protected override validations = {

        ...super.validations,
        valid_inventory_type: (obj:any, key:string) => obj[key] == 2,
        valid_agent:(obj:any, key:string) => this.valid_agent(obj),
        is_valid_trabajador_tipo: (obj:any, key:string) => [1,2,3].includes( obj[key]*1),
        is_valid_regimen: (obj:any, key:string) => [1,2].includes( obj[key]*1)
    }

    public override valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        // como hay otros objetos de inventario con la misma estructura primero siempre comprobar que sea un trabajador

       if(!this.validations.valid_inventory_type(obj,'type')) return false

       return super.valueIsValid(obj,key)
    }

    public override getModel() {
        
        const model = ['nuevo',null,2,[],false]

        return [...model]
    }

    private valid_agent(obj:any){

        const agent = this.getValue(obj,'agent');

        return (this.getValue(obj,'id') == 'nuevo' && agent === null) || typeof agent == 'number';
    }


}
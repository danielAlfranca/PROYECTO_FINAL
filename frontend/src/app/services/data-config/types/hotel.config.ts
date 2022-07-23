import { Injectable, Injector } from "@angular/core";
import { InventoryConfig } from "../models/inventory";
import { DataConfig } from "../models/data-config";
import * as _ from "lodash";


@Injectable({
    providedIn: 'root' 
})

export class HotelConfig extends DataConfig{

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
        hidden:{

            private:4, 
            validations:['is_boolean'], 
            required:true,
        }, 

        nombre:{ 
            
            private:'3.0', 
            validations:['is_string'], 
            required:true           
        },
        tipo:{ 
            
            private:'3.1', 
            validations:['valid_tipo_hotel'], 
            required:true,

            getter: (obj: any) =>   this.getValue(obj, 'is_hotel') ? 'hotel' :
                                    this.getValue(obj, 'is_lodge') ? 'lodge' :
                                    this.getValue(obj, 'is_alojamiento') ? 'alojamiento' : false,

            setter: (obj: any, value: string) => {
                
                const   key = this.keys.nombre, 
                        index = ['hotel','lodge','alojamiento'].findIndex(e=>e==value);
                
                if(index==-1) return false;

                return Boolean(this.setByPath(obj,key,index+1));                
            }                 
        },
        propietario:{ 
            
            private:'3.5', 
            validations:['valid_propietario'],  
            required:false,
            getter:(obj: any)=>this.getRef('empresa',this.getByPath(obj,this.keys.propietario),'nombre'), // DEVUELVE SOLO NOMBRE
            setter: (obj: any, value: any) => { // EL VALOR ESPERADO PARA INTRODUCIR ES UN OBJETO EMPRESA

                if(this.getRef('empresa',value,'is_empresa')){

                    const key = this.keys.propietario, id = this.getRef('empresa',value,'id');

                    return Boolean(this.setByPath(obj,key,id));

                } else return false
            }         
        },
        categoria:{ 
            
            private:'3.2', 
            validations:['valid_categoria'],  
            required:false,        
        },
        direccion:{ 
            
            private:'3.4', 
            validations:['is_string'], 
            required:false,        
        },
        telefonos:{ 
            
            private:'3.6', 
            validations:['is_string_array'], 
            required:false,        
        },
        emails:{  
            
            private:'3.7', 
            validations:['is_string_array'], 
            required:false,        
        },
        lista_telefonos:{ 
            
            getter:(obj:any)=>(this.getValue(obj,'telefonos')|| [] ).join(', ')          
        },
        lista_emails:{ 
            
            getter:(obj:any)=>(this.getValue(obj,'emails')|| [] ).join(', ')        
        },       
        estrellas:{ 
            
            getter:(obj:any)=>  {

                const categoria = this.getValue(obj,'categoria');

                if( !(this.getValue(obj,'is_hotel')) || !categoria) return '';

                return new Array(categoria).fill('*').join('')
            } 
        },

        tipo_categoria:{ 
            
            getter:(obj:any)=>  {

                const tipo = this.getValue(obj,'tipo')

                return tipo + (this.getValue(obj,'is_hotel') ? '(' + this.getValue(obj,'estrellas')+')':'')
            } 
        },
        
        is_hotel:{ getter:(obj:any)=> this.getByPath(obj,this.keys.tipo)  == 1 },

        is_lodge:{ getter:(obj:any)=> this.getByPath(obj,this.keys.tipo) == 2 },

        is_alojamiento:{ getter:(obj:any)=> this.getByPath(obj,this.keys.tipo)  == 3 }

    }
    
    constructor(protected override injector:Injector){ super(injector); }

    protected override validations = {

        ...super.validations,
        valid_inventory_type: (obj:any, key:string) => obj[key] == 3,
        valid_agent:(obj:any, key:string) => obj[key] == 1 , 
        valid_propietario:(obj:any, key:string) =>  this.getRef('empresa',obj[key],'id'),
        valid_tipo_hotel:  (obj:any, key:string) =>  [1,2,3].includes( obj[key]),
        valid_categoria:  (obj:any, key:string) => !this.getValue(obj,'is_hotel') || [1,2,3,4,5].includes( obj[key])
    }

    public override valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        // como hay otros objetos de inventario con la misma estructura primero siempre comprobar que sea un hotel

       if(!this.validations.valid_inventory_type(obj,'type')) return false

       return super.valueIsValid(obj,key)
    }

    public override getModel() {
        
        const model = ['nuevo',1,3,[],false]

        return [...model]
    }
   

}
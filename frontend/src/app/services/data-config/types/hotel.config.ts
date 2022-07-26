import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../models/data-config";
import * as _ from "lodash";
@Injectable({
    providedIn: 'root' 
})

export class HotelConfig extends DataConfig{

      
    constructor(protected override injector:Injector){ super(injector); }

    protected override getters = {

        tipo: (obj: any) => this.getValue(obj, 'is_hotel') ? 'hotel' :
                            this.getValue(obj, 'is_lodge') ? 'lodge' :
                            this.getValue(obj, 'is_alojamiento') ? 'alojamiento' : false,

        propietario_nombre:(obj: any)=>this.getRef('empresa',this.getByPath(obj,this.getKey('propietario')),'nombre'), // DEVUELVE SOLO NOMBRE  */

        lista_telefonos:(obj:any)=>(this.getValue(obj,'telefonos')|| [] ).join(', '),

        lista_emails:(obj:any)=>(this.getValue(obj,'emails')|| [] ).join(', '),

        is_hotel:(obj:any)=> this.getByPath(obj,this.getKey('tipo'))  == 1 ,

        is_lodge:(obj:any)=> this.getByPath(obj,this.getKey('tipo')) == 2 ,

        is_alojamiento:(obj:any)=> this.getByPath(obj,this.getKey('tipo'))  == 3 ,

        tipo_categoria:(obj:any)=>  {

            const tipo = this.getValue(obj,'tipo')

            return tipo + (this.getValue(obj,'is_hotel') ? '(' + this.getValue(obj,'estrellas')+')':'')
        },
        estrellas:(obj:any)=>  {

            const categoria = this.getValue(obj,'categoria');

            if( !(this.getValue(obj,'is_hotel')) || !categoria) return '';

            return new Array(categoria).fill('*').join('')
   
        },

    }

    protected override setters: { [key: string]: (obj: any, value: any) => any; } = {

        agent:(obj:any, value:any)=>false,// solo asignable desde servidor aunque presente aqui para busquedas por referencia
        tipo: (obj: any, value: string) => {
                
            const   key = this.getKey('tipo'), index = ['hotel','lodge','alojamiento'].findIndex(e=>e==value);
            
            if(index==-1) return false;

            return Boolean(this.setByPath(obj,key,index+1));                
        }                    
    };

    protected override validations = {

        ...this.common_validations,
        type_valid: (obj:any, key:string) => this.getValue(obj,key) == 3,
        agent_valid:(obj:any, key:string) => this.getValue(obj,key) == 1 ,
        tipo_valid:  (obj:any, key:string) =>  [1,2,3].includes( this.getByPath(obj,this.getKey(key)) ),
        categoria_valid:  (obj:any, key:string) => !this.getValue(obj,'is_hotel') || [1,2,3,4,5].includes( this.getByPath(obj,this.getKey(key)) )
    }
  

    public override valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        // como hay otros objetos de inventario con la misma estructura primero siempre comprobar que sea una empresa

       if(!this.validations.type_valid(obj,'type')) return false

       return super.valueIsValid(obj,key)
    }

}
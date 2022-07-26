import { InventoryConfig } from "../models/inventory";
import { DataConfig } from "../models/data-config";
import { Injectable, Injector } from "@angular/core";

@Injectable({
    providedIn: 'root' 
  })

export class TrabajadorConfig extends DataConfig{

    
    constructor(protected override injector:Injector){ super(injector); }

    protected  override validations = {

        ...this.common_validations,
        type_valid: (obj:any, key:string) =>this.getValue(obj,key) ==  2,
        agent_valid:(obj:any, key:string) => this.valid_agent(obj),
        tipo_valid: (obj:any, key:string) => [1,2,3].includes( this.getByPath(obj,this.getKey(key))  *1),
        regimen_valid: (obj:any, key:string) => [1,2].includes( this.getByPath(obj,this.getKey(key)) *1)
    }

    protected override getters = {

        tipo:(obj:any)=>{

            return  this.getValue(obj, 'es_guia')            ?   'guia' :
                    this.getValue(obj, 'es_chofer')          ?   'chofer' :
                    this.getValue(obj, 'es_administrativo')  ?   'administrativo' : false;      
        },
        regimen: (obj:any)=>{

            return  this.getValue(obj, 'esta_en_plantilla')      ?   'en plantilla' :
                    this.getValue(obj, 'es_autonomo')            ?   'autonomo' :false;
        },
        nombre_completo: (obj:any)=>(this.getValue(obj,'nombre')|| [] ).split(',').join(""),

        lista_telefonos:(obj:any)=>(this.getValue(obj,'telefonos')|| [] ).join(', '),

        lista_emails:(obj:any)=>(this.getValue(obj,'emails')|| [] ).join(', '),

        es_guia:(obj:any)=>(this.getByPath(obj,this.getKey('tipo')) == 1 ) ,

        es_chofer:(obj:any)=>(this.getByPath(obj,this.getKey('tipo')) == 2 ) ,

        es_administrativo:(obj:any)=>(this.getByPath(obj,this.getKey('tipo'))  == 3 ) ,
        
        esta_en_plantilla:(obj:any)=>(this.getByPath(obj,this.getKey('regimen'))  == 1 ) ,

        es_autonomo:(obj:any)=>(this.getByPath(obj,this.getKey('regimen'))  == 2 ) , 
    }

    protected override setters: { [key: string]: (obj: any, value: any) => any; } = {

        agent:(obj:any, value:any)=>false,// solo asignable desde servidor aunque presente aqui para busquedas por referencia
        tipo: (obj: any, value: any) => { 

            const key = this.getKey('tipo'), index = ['guia','chofer','administrativo'].findIndex(e=>e==value);
            
            if(index==-1) return false;

            return Boolean(this.setByPath(obj,key,index+1)); 
        },
        regimen: (obj: any, value: any) => { 

            const key = this.getKey('regimen'), index = ['en plantilla','autonomo'].findIndex(e=>e==value);
            
            if(index==-1) return false;

            return Boolean(this.setByPath(obj,key,index+1)); 
        },  
    };

    public override valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        // como hay otros objetos de inventario con la misma estructura primero siempre comprobar que sea una empresa

       if(!this.validations.type_valid(obj,'type')) return false

       return super.valueIsValid(obj,key)
    }

    private valid_agent(obj:any){

        const agent = this.getValue(obj,'agent');

        return (this.getValue(obj,'id') == 'nuevo' && agent === null) || typeof agent == 'number';
    }

}
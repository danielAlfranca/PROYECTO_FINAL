import { ThisReceiver } from '@angular/compiler';
import { Injector } from '@angular/core';
import * as _ from 'lodash';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { DataService } from '../../data-queries/data.service';
import { DataConfigService } from '../data-config.service';

interface PropertyConfig{

    name:string, //NOMBRE PUBLICO

    private?:string|number, // PRIVATE KEY o O PATH ("PROP1.PROP2") SEGUN LA ESTRUCTURA QUE TIENE EL DATO DESCARGADO DEL SERVIDOR

    validations?:string[], // LISTADO DE VALIDACIONES PARA EL VALOR QUE SE INTRODUCE 

    required?:boolean, // SI ES IMPRESCINDIBLE O NO                      
}

export abstract class DataConfig{

    protected getters:{[key:string]:(obj:any)=>any} = {}; // GETTERS PARA PROPIEDADES DEL OBJETO

    protected setters:{[key:string]:(obj:any, value:any)=>any} = {}; // SETTERS PARA PROPIEDADES DEL OBJETO

    /* VALIDACIONES */

    protected validations:{[key:string]:(obj:any, key:string)=>boolean} = {}

    protected common_validations:{[key:string]:(obj:any, key:string)=>boolean} = {

        is_boolean:(obj:any, key:string) => {
            
            const value = this.getByPath(obj,this.getKey(key));

            return typeof value == "boolean" || value == 1 || value == 0
        
        },

        is_string:(obj:any, key:string) => typeof String(this.getByPath(obj,this.getKey(key))) == "string",

        is_number:(obj:any, key:string) => !isNaN(this.getByPath(obj,this.getKey(key))),

        is_string_array:(obj:any, key:string) =>{ let value = this.getByPath(obj,this.getKey(key)); return Array.isArray(value) && value.every((e:any)=>typeof (e+'')  == "string")},

        id_valid:(obj:any, key:string) => { let value = this.getByPath(obj,this.getKey(key)); return !isNaN(value) || value  == 'nuevo'},

        agent_valid:(obj:any, key:string) => true


    }; // VALIDACIONES 

    protected globalValidations!:((obj:any)=>boolean)[]; // VALIDACIONES ESPECIFICAS PARA EL CONJUNTO DEL OBJETO, NO SOLO UNA PROPIEDAD

    constructor(protected injector:Injector){}  

     /* METODOS VALIDACION */

    public objectIsValid!:(obj:any)=>boolean;

    public valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        const propConfig:PropertyConfig = this.getKey(key), value = this.getByPath(obj, propConfig);
        console.log(key,value);
        if(propConfig.required && value === undefined) return false;

        if(!propConfig.required && value === undefined) return true;

        return !propConfig.validations || propConfig.validations.every(validation=>{ // SI NO REQUIERE VALIDACION O TODAS LAS VALIDACIONES OK
            console.log(key, (this.validations[validation])(obj,key),value);  
            return (this.validations[validation])(obj,key); // SE BUSCA EN VALIDACIONES ESPECIFICAS DE LA CLASE
        });
    }

    // GETTER DE PROPIEDAD DE OBJETO

    public getValue(obj:any, property:string){

        const configKey = this.getKey(property);

        //if(property=="lista_emails") console.log(configKey,obj)

        if(!configKey && !this.getters[property]) return false;

        if(!this.getters[property]) return configKey.private !== undefined ? this.getByPath(obj,configKey) : undefined

        return this.getters[property](obj);
    }

    protected getByPath(obj:any, configKey:PropertyConfig){ // pilla el valor de la propiedad a traves del path determinado en la private key
     
        return _.get(obj,configKey.private as string, undefined)
    }

    // SETTER DE PROPIEDAD DE OBJETO

    public setValue(obj:any, value:any, property:string){

        const configKey = this.getKey(property);

        switch(true){

            case !configKey as boolean: return false;

            case !this.setters[property] as boolean: return configKey.private ? this.setByPath(obj,configKey,value) : false;

            default: return this.setters[property](obj,value )
        }
    }

    
    protected setByPath(obj:any, configKey:PropertyConfig, value:any){ // establece el valor de la propiedad a traves del path determinado en la private key

          return _.set(obj,configKey.private as string, value) || false
    }

    public getErrorsList(obj:any, key:string){ // devuelve lista de errores

        const propConfig:PropertyConfig = this.getKey(key), value = this.getValue(obj, key);
        
        let errors:any = {};

        if(propConfig.required && value === undefined) errors = {required:true};        

        (propConfig.validations || []).forEach(validation=>{ 

            if (!((this.validations[validation])(obj,key))){ errors = {...errors, [validation]:true}}; 
        });

        return errors
    }
   

    protected getRef(section:DataTypes, id:string|number, prop:string){ // (solo uso interno) SELECCIONA UNA REFERENCIA A OTRA TABLA DE OTRO TIPO DE DATO Y DEVUELVE PROPIEDAD 

        const element = this.injector.get(DataService).find(section,id as string);

       return this.injector.get(DataConfigService).getValue(element,prop,section);
    }

    public getKey!:(keyName:string)=>PropertyConfig; 

    public getModel!:()=>any

    public init(dataConfig:any){ // SE GUARDAN EN FORMA DE CLOSURE LA LISTA DE PATHS A PROPIEDADES ,el MODELO DEFAULT Y LA VALIDACION DEL

        const model = dataConfig.model, keys =  dataConfig.indexes;

        Object.keys(keys).forEach(key=>keys[key].name=key);

        this.getKey = (keyName:string)=> keys[keyName];

        this.getModel = ()=> {

            let closure = model;

            return JSON.parse(JSON.stringify(closure))
        }

        this.objectIsValid = (obj:any) =>{ // VALIDA OBJETO
        
            const propertiesAreValid = Object.keys(keys).every( key=> this.valueIsValid(obj,key) ),
    
                  globalIsvalid = !this.globalValidations || this.globalValidations.every(method=>method(obj));
    
            return  propertiesAreValid && globalIsvalid;
        }
        
    }

}

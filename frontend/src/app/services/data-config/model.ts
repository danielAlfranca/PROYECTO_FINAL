import { Injector } from '@angular/core';
import { isAfter, isMatch, isSameDay, isWithinInterval, parse } from 'date-fns';
import * as _ from 'lodash';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { DataService } from '../data-queries/data.service';
import { DataConfigService } from './data-config.service';

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

    protected validations:{[key:string]:(obj:any, key:string)=>boolean} = {

        is_boolean:(obj:any, key:string) => {
            
            const value = this.getByPath(obj,this.getKey(key));

            return typeof value == "boolean" || value == 1 || value == 0
        
        },

        is_string:(obj:any, key:string) => typeof String(this.getByPath(obj,this.getKey(key))) == "string",

        is_number:(obj:any, key:string) => !isNaN(this.getByPath(obj,this.getKey(key))),

        nullable:(obj:any, key:string) => true,

       /*  is_string_array:(obj:any, key:string) =>{ let value = this.getByPath(obj,this.getKey(key)); return Array.isArray(value) && value.every((e:any)=>typeof (e+'')  == "string")}, */

        id_valid:(obj:any, key:string) => { let value = this.getByPath(obj,this.getKey(key)); return !isNaN(value) || value  == 'nuevo'},

        user_valid:(obj:any, key:string) => true, // se valida en servidor

        date_valid:(obj:any, key:string) => isMatch(this.getByPath(obj,this.getKey(key)),'yyyy-mm-dd'),

        date_end_valid:(obj:any, key:string) => {
            
            let start = this.getByPath(obj,this.getKey('date_start')), end = this.getByPath(obj,this.getKey(key));

            if (start && end){

                start = parse(start, 'yyyy-MM-dd', new Date());
                end = parse(end, 'yyyy-MM-dd', new Date());

                return isAfter(end,start) || isSameDay(end,start);
            }
                  
            return false;
        },

        time_valid:(obj:any, key:string) => isMatch(this.getByPath(obj,this.getKey(key)),'HH:mm'),

        pasajeros_valid:(obj:any, key:string) => {

            let arr = (this.getByPath(obj,this.getKey(key)) + '').split('.'), adultos = Number(arr[0]);

            return arr.length == 3 && adultos >0;
        } ,


    }; // VALIDACIONES 

    protected globalValidations!:((obj:any)=>boolean)[]; // VALIDACIONES ESPECIFICAS PARA EL CONJUNTO DEL OBJETO, NO SOLO UNA PROPIEDAD

    constructor(protected injector:Injector){}  

     /* METODOS VALIDACION */

    public objectIsValid!:(obj:any)=>boolean;

    public valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD
  
        const propConfig:PropertyConfig = this.getKey(key), value = this.getByPath(obj, propConfig);
        console.log(key,value)
        if(propConfig.required && (value === undefined || value === null)) return false;
        console.log(key,value)
        if(!propConfig.required && (value === undefined || value === null || value === '')) return true;

        return !propConfig.validations || propConfig.validations.every(validation=>{ // SI NO REQUIERE VALIDACION O TODAS LAS VALIDACIONES OK
            console.log(key,value,this.validations[validation](obj,key)); 
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

        //console.log(value, configKey);

        switch(true){

            case !configKey as boolean: return false;

            case !this.setters[property] as boolean: return configKey.private !== undefined ? this.setByPath(obj,configKey,value) : false;

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
   

    protected getRef(section:DataTypes, id:string|number, prop:string, indexName?:string){ // (solo uso interno) SELECCIONA UNA REFERENCIA A OTRA TABLA DE OTRO TIPO DE DATO Y DEVUELVE PROPIEDAD 

        const element = this.injector.get(DataService).find(section,id as string, indexName);

       return this.injector.get(DataConfigService).getValue(element,prop,section);
    }

    public getKey!:(keyName:string)=>PropertyConfig; 

    public getModel!:()=>any

    public init(dataConfig:any){ // SE GUARDAN EN FORMA DE CLOSURE LA LISTA DE PATHS A PROPIEDADES ,el MODELO DEFAULT Y LA VALIDACION DEL

        const keys = (dataConfig.indexes);

        Object.keys(keys).forEach(key=>keys[key].name=key);

        this.getKey = (keyName:string)=> keys[keyName];

        this.getModel = ()=> {

            let model:any = [];

            Object.values(keys).sort((a:any,b:any)=>{ // ordenamos por keys para evitar q 3.2 este antes q 3

                return a.private-b.private
    
            }).forEach((e:any)=>{
    
                if(e.default!==undefined) this.setByPath(model,e,e.default);

            });

            return model;

        };

        this.objectIsValid = (obj:any) =>{ // VALIDA OBJETO
        
            const propertiesAreValid = Object.keys(keys).every( key=> this.valueIsValid(obj,key) ),
    
                  globalIsvalid = !this.globalValidations || this.globalValidations.every(method=>method(obj));
    
            return  propertiesAreValid && globalIsvalid;
        }
        
    }

}

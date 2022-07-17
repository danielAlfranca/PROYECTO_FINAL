import { DataService } from "../../data-queries/data.service";

interface PropertyConfig{

    private?:string|number, // PRIVATE KEY SEGUN LA ESTRUCTURA QUE TIENE EL DATO DESCARGADO DEL SERVIDOR

    validations?:string[], // LISTADO DE VALIDACIONES PARA EL VALOR QUE SE INTRODUCE 

    required?:boolean, // SI ES IMPRESCINDIBLE O NO 

    getter?:(obj:any)=>any,   // FUNCION PARA PROCESAR EL VALOR PRIVADO DEL OBJETO ANTES DE RETORNARLO.

    setter?:(obj:any, value:any)=>boolean,  // FUNCION PARA PROCESAR EL VALOR PRIVADO DEL OBJETO ANTES DE INTRODUCIRLO.                          
}

export abstract class DataConfig{

    protected readonly keys:{[key:string]:PropertyConfig}  = {}; // LISTADO DE GETTERS Y SETTERS SEGUN EL TIPO DE DATO    

    /* VALIDACIONES */

    protected validations!:{[key:string]:(value:string)=>boolean}; // VALIDACIONES COMUNES

    protected globalValidations!:((obj:any)=>boolean)[]; // VALIDACIONES ESPECIFICAS PARA EL CONJUNTO DEL OBJETO, NO SOLO UNA PROPIEDAD

    /* para solicitudes de datos, opcional */ 

    protected dataQueries!:DataService;    

    constructor(){}  

     /* METODOS VALIDACION */

    public objectIsValid(obj:any):boolean{ // VALIDA OBJETO
        
        const propertiesAreValid = Object.keys(this.keys).every( key=> this.valueIsValid(obj,key) ),

              globalIsvalid = !this.globalValidations || this.globalValidations.every(method=>method(obj));

        return  propertiesAreValid && globalIsvalid;
    }

    public valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        const propConfig:PropertyConfig = this.keys[key], value = this.getValue(obj, key);

        if(propConfig.required && value === undefined) return false;

        return !propConfig.validations || propConfig.validations.every(validation=>{ // SI NO REQUIERE VALIDACION O TODAS LAS VALIDACIONES OK

            return (this.validations[validation])(value); // SE BUSCA EN VALIDACIONES ESPECIFICAS DE LA CLASE
        });
    }

    // GETTER DE PROPIEDAD DE OBJETO

    public getValue(obj:any, property:string){

        const configKey = this.keys[property];

        if(!configKey) return undefined;

        if(!configKey.getter) return configKey.private ? obj[configKey.private] : undefined

        return configKey.getter(obj)
    }

    // SETTER DE PROPIEDAD DE OBJETO

    public setValue(obj:any, value:any, property:string){

        const configKey = this.keys[property];

        switch(true){

            case !configKey || !this.valueIsValid(value,property): return false;

            case !configKey.setter: return configKey.private ? ((obj[configKey.private] = value) || true) : false;

            default: return (configKey.setter as Function )(obj, value )
        }
    }
}

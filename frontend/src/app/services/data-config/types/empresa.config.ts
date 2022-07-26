import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../models/data-config";

@Injectable({
    providedIn: 'root' 
  })
export class EmpresaConfig extends DataConfig{
   

    protected override validations = {

        ...this.common_validations,
        type_valid: (obj:any, key:string) => this.getValue(obj,key) == 1,
        agent_valid:(obj:any, key:string) => this.valid_agent(obj)     

    }
    constructor(protected override injector:Injector){ super(injector); }

    protected override getters = {

        lista_telefonos:(obj:any)=>(this.getValue(obj,'telefonos')|| [] ).join(', '),

        lista_emails:(obj:any)=>(this.getValue(obj,'emails')|| [] ).join(', '),
    }

    protected override setters: { [key: string]: (obj: any, value: any) => any; } = {

        agent:(obj:any, value:any)=>false// solo asignable desde servidor aunque presente aqui para busquedas por referencia
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
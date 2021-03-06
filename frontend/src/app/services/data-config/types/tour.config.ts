import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../models/data-config";

@Injectable({
    providedIn: 'root' 
  })

export class TourConfig extends DataConfig{

   
    constructor(protected override injector:Injector){ super(injector); }

    protected override validations = {

        ...this.common_validations,
        type_valid: (obj:any, key:string) => this.getValue(obj,key) == 4,
        agent_valid:(obj:any, key:string) => this.getValue(obj,key) == 1   

    }
    
    public override valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        // como hay otros objetos de inventario con la misma estructura primero siempre comprobar que sea una empresa

       if(!this.validations.type_valid(obj,'type')) return false

       return super.valueIsValid(obj,key)
    }

    protected override getters = {

        horario_completo:(obj:any)=>this.getValue(obj,'inicio') + ' - ' + this.getValue(obj,'fin')
    }

}
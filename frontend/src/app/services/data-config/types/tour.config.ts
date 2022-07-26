import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../models/data-config";

@Injectable({
    providedIn: 'root' 
  })

export class TourConfig extends DataConfig{

   
    constructor(protected override injector:Injector){ super(injector); }

    protected override validations = {

        ...this.common_validations,
        valid_inventory_type: (obj:any, key:string) => obj[key] == 4,
        valid_agent:(obj:any, key:string) => this.valid_agent(obj)     

    }
  
    private valid_agent(obj:any){

        const agent = this.getValue(obj,'agent');
        return (this.getValue(obj,'id') == 'nuevo' && agent === null) || typeof agent == 'number';
    }

    protected override getters = {

        horario_completo:(obj:any)=>this.getValue(obj,'inicio') + ' - ' + this.getValue(obj,'fin')
    }

}
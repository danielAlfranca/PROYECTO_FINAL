import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { ActivityConfig } from "./modelActivity.config";

@Injectable({
    providedIn: 'root' 
  })

export class TrasladoActivityConfig extends ActivityConfig{
    
    override activitType  = 6;

    constructor(protected override injector:Injector, protected override datePipe:DatePipe){ super(injector, datePipe); }

    protected override getters = { 

        ...super.getters,

        operador_name:(obj:any)=> this.getRef('empresa',this.getValue(obj, 'agent'),'nombre','agent'),

    }

}
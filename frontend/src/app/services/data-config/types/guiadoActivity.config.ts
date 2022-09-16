import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { ActivityConfig } from "./modelActivity.config";

@Injectable({
    providedIn: 'root' 
  })

export class GuiadoActivityConfig extends ActivityConfig{
    
    override activitType  = 4;

    constructor(protected override injector:Injector, protected override datePipe:DatePipe){ super(injector, datePipe); }

    protected override getters:any = { 

        ...this.getters,

        full_name:(obj:any)=> this.getRef('trabajador',this.getValue(obj, 'agent'),'nombre_completo','agent'),

        regimen:(obj:any)=> this.getRef('trabajador',this.getValue(obj, 'agent'),'regimen','agent'),

        phones_list:(obj:any)=> this.getRef('trabajador',this.getValue(obj, 'agent'),'lista_telefonos','agent'),

        mails_list:(obj:any)=> this.getRef('trabajador',this.getValue(obj, 'agent'),'lista_emails','agent')

    }

}
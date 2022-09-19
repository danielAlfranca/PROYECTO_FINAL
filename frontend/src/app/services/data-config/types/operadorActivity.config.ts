import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { ActivityConfig } from "./modelActivity.config";

@Injectable({
    providedIn: 'root' 
  })

export class OperadorActivityConfig extends ActivityConfig{
    
    override activitType  = 6;

    constructor(protected override injector:Injector, protected override datePipe:DatePipe){ super(injector, datePipe); }

    protected override getters:any = { 

        ...this.getters,

        operator_name:(obj:any)=> this.getRef('empresa',this.getValue(obj, 'agent'),'nombre','agent'),

        phones_list:(obj:any)=> this.getRef('empresa',this.getValue(obj, 'agent'),'lista_telefonos','agent'),

        mails_list:(obj:any)=> this.getRef('empresa',this.getValue(obj, 'agent'),'lista_emails','agent'),

        address:(obj:any)=> this.getRef('empresa',this.getValue(obj, 'agent'),'direccion','agent')

    }

}
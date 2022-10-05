import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";


@Injectable({
    providedIn: 'root' 
  })

export class GuiadoActivityConfig extends DataConfig{
    


    constructor(protected override injector:Injector){ super(injector); }

    protected override getters:any = { 

        ...this.getters,

        full_name:(obj:any)=> this.getRef('trabajador',this.getValue(obj, 'proveedor'),'nombre')+ ' ' + this.getRef('trabajador',this.getValue(obj, 'proveedor'),'apellidos'),

        regimen:(obj:any)=> this.getRef('trabajador',this.getValue(obj, 'proveedor'),'regimen_nombre'),

        phones_list:(obj:any)=> this.getRef('trabajador',this.getValue(obj, 'proveedor'),'telefonos'),

        mails_list:(obj:any)=> this.getRef('trabajador',this.getValue(obj, 'proveedor'),'emails')

    }

}
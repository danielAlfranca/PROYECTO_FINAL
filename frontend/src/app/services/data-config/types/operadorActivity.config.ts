import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";


@Injectable({
    providedIn: 'root' 
  })

export class OperadorActivityConfig extends DataConfig{

    constructor(protected override injector:Injector){ super(injector); }

    protected override getters:any = { 

        ...this.getters,

        operator_name:(obj:any)=> this.getRef('empresa',this.getValue(obj, 'proveedor'),'nombre'),

        phones_list:(obj:any)=> this.getRef('empresa',this.getValue(obj, 'proveedor'),'telefonos'),

        mails_list:(obj:any)=> this.getRef('empresa',this.getValue(obj, 'proveedor'),'emails'),

        address:(obj:any)=> this.getRef('empresa',this.getValue(obj, 'proveedor'),'direccion')

    }

}

import { DataConfig } from "../model";
import { Injectable, Injector } from "@angular/core";

@Injectable({
    providedIn: 'root' 
  })

export class TrabajadorConfig extends DataConfig{

    
    constructor(protected override injector:Injector){ super(injector); }

    protected  override validations:any = {

        ...this.validations,
        tipo_valid: (obj:any, key:string) => [1,2,3].includes( this.getByPath(obj,this.getKey(key))  *1),
        regimen_valid: (obj:any, key:string) => [1,2].includes( this.getByPath(obj,this.getKey(key)) *1)
    }

    protected override getters = {

        tipo_nombre:(obj:any)=>{

            const tipo = this.getValue(obj,'tipo');

            return  tipo == 1 ? 'guia' : tipo== 2 ? 'chofer' : tipo == 3 ? 'administrativo' : ''      
        },
        regimen_nombre: (obj:any)=>{

            const regimen = this.getValue(obj,'regimen');

            return  regimen == 1  ?  'en plantilla' : regimen == 2 ? 'autonomo':false;
        },
        nombre_completo: (obj:any)=>this.getValue(obj,'nombre') + " " + this.getValue(obj,'apellidos'),

    }


}
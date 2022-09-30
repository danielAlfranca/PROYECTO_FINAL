import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";
import * as _ from "lodash";
@Injectable({
    providedIn: 'root' 
})

export class HotelConfig extends DataConfig{

      
    constructor(protected override injector:Injector){ super(injector); }

    protected override getters = {

        tipo_nombre: (obj: any) =>  this.getTipoNombre(obj),
        propietario_nombre:(obj: any)=>this.getRef('empresa',this.getValue(obj,'propietario'),'nombre'), // DEVUELVE SOLO NOMBRE  */
    }

    protected override validations:any = {

        ...this.validations,
        tipo_valid:  (obj:any, key:string) =>  [1,2,3].includes( Number(this.getValue(obj,key)) ),
        categoria_valid:  (obj:any, key:string) => this.getValue(obj,'tipo')!=1 || [1,2,3,4,5].includes( Number(this.getValue(obj,key)) )
    }
  
    private getTipoNombre(obj:any){

        const tipo = this.getValue(obj, 'tipo');

        return tipo == 1 ? 'hotel' : tipo== 2 ? 'lodge' : tipo == 3 ? 'alojamiento' : ''

    }

}
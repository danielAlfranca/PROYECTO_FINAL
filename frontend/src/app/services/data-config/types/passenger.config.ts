import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";
import { DatePipe } from "@angular/common";
import { AppConfigService } from "../../app-config.service";
import { format, parse } from "date-fns";


@Injectable({
    providedIn: 'root' 
  })
export class PassengerConfig extends DataConfig{
   

    constructor(protected override injector:Injector,private datePipe:DatePipe ){ super(injector); }

    protected override getters = {

        full_name:(obj:any)=>this.getValue(obj,'nombre') + ' ' +this.getValue(obj,'apellidos'),

        provider_name:(obj:any)=>this.getRef('empresa',this.getValue(obj,'proveedor') ,'nombre'),

        passengers_list:(obj:any)=>this.get_passengers_list(obj),
        
        date_start:(obj:any)=>this.getRef('salida',this.getValue(obj,'salida') ,'date_start'),

        date_end:(obj:any)=>this.getRef('salida',this.getValue(obj,'salida') ,'date_end'),

        tour:(obj:any)=>this.getRef('salida',this.getValue(obj,'salida') ,'tour')

    }

    private get_passengers_list(obj:any){ 
        
        let str = '', num;
        const   pax = (this.getValue(obj,'pasajeros')).split('.'),
                singulars = ['adulto', 'nino', 'infante'],
                plurals = ['adultos', 'ninos', 'infantes'];

        return pax.reduce((strPax:string,el:number, i:number)=>{

            num = Number(el);

            if(num > 0 ){

                str = '' +  num + ' ' + (num > 1 ? plurals[i]:singulars[i]);

                return strPax + (i != 0 ? ', ' : '') + str;
            }

            return strPax;

        }, '')
    }




}
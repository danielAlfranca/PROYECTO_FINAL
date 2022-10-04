import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";


@Injectable({
    providedIn: 'root' 
  })

export class TourActivityConfig extends DataConfig{

   
    constructor(protected override injector:Injector){ super(injector); }


    protected override getters:any = { 
 
        ...this.getters,

        tour_nombre:(obj:any)=> this.getRef('tour',this.getValue(obj, 'tour'),'nombre'),

        passengers_list:(obj:any)=>this.get_passengers_list(obj),

        salida_date_start: (obj:any)=>this.getRef('salida', this.getValue(obj,'salida'),"date_start"),

        salida_date_end: (obj:any)=>this.getRef('salida', this.getValue(obj,'salida'),"date_end"),

        salida_pax: (obj:any)=>'this.get_salida_pax(obj)'
        
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
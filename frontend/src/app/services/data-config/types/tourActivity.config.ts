import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";
import { ActivityConfig } from "./modelActivity.config";

@Injectable({
    providedIn: 'root' 
  })

export class TourActivityConfig extends ActivityConfig{

    override activitType  = 1;
   
    constructor(protected override injector:Injector, protected override datePipe:DatePipe){ super(injector, datePipe); }


    protected override getters:any = { 
 
        ...this.getters,

        tour_name:(obj:any)=> this.getRef('tour',this.getValue(obj, 'tour_id'),'nombre'),

        passengers_list:(obj:any)=>this.get_passengers_list(obj),
        
    }

    private get_passengers_list(obj:any){

        
        let str = '', num;
        const pax = this.getValue(obj,'pax'),
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
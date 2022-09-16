import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { ActivityConfig } from "./modelActivity.config";

@Injectable({
    providedIn: 'root' 
  })

export class HotelActivityConfig extends ActivityConfig{

    override activitType  = 2;
   
    constructor(protected override injector:Injector, protected override datePipe:DatePipe){ super(injector, datePipe); }

    protected override getters:any = { 

        ...this.getters,

        hotel_name:(obj:any)=> this.getRef('hotel',this.getValue(obj, 'hotel_id'),'nombre'),

        rooms_list:(obj:any)=>this.get_rooms_list(obj),
        
    }

    private get_rooms_list(obj:any){

        return 'falta';

        let str = '', num;

        const pax = this.getValue(obj,'pax'),
            singulars = ['doble', 'triple', 'infante'],
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
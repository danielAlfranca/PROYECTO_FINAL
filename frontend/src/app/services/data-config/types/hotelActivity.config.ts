import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";

@Injectable({
    providedIn: 'root' 
  })

export class HotelActivityConfig extends DataConfig{

   
    constructor(protected override injector:Injector, private datePipe:DatePipe){ super(injector); }

    protected override validations = {

        ...this.common_validations,
        type_valid: (obj:any, key:string) => true,
        agent_valid:(obj:any, key:string) => true   

    }
    
    public override valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        // como hay otros objetos de inventario con la misma estructura primero siempre comprobar que sea una empresa

       if(!this.validations.type_valid(obj,'type')) return false

       return super.valueIsValid(obj,key)
    }

    protected override getters = { 

        date_start:(obj:any)=>  this.datePipe.transform(this.getByPath(obj,this.getKey('date_start') ), 'dd/MM/yy'),
        
        date_end:(obj:any)=>  this.datePipe.transform(this.getByPath(obj,this.getKey('date_end') ), 'dd/MM/yy'),

        full_dates:(obj:any)=>this.getValue(obj,'date_start') + ' - ' + this.getValue(obj,'date_end'),

        hotel_name:(obj:any)=> this.getRef('hotel',this.getValue(obj, 'hotel_id'),'nombre'),

        rooms_list:(obj:any)=>this.get_rooms_list(obj),
        
    }

    /* protected override setters: { [key: string]: (obj: any, value: any) => any; } = {

    }; */

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
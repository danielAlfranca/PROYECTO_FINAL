import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";
import { DatePipe } from "@angular/common";

@Injectable({
    providedIn: 'root' 
  })
export class PassengerConfig extends DataConfig{
   

    protected override validations = {

        ...this.common_validations,
        type_valid: (obj:any, key:string) => this.getValue(obj,key) == 2,
        agent_valid:(obj:any, key:string) => this.valid_agent(obj)     

    }
    constructor(protected override injector:Injector,private datePipe:DatePipe ){ super(injector); }

    protected override getters = {

        full_name:(obj:any)=>this.getRef('reserva',this.getValue(obj,'id') ,'full_name'),

        provider_name:(obj:any)=>this.getRef('reserva',this.getValue(obj,'id') ,'provider_name'),

        phones_list:(obj:any)=> this.getRef('reserva',this.getValue(obj, 'id'),'phones'),

        pax_list:(obj:any)=>this.get_passengers_list(this.getValue(obj,'passengers')),

    }

    protected override setters: { [key: string]: (obj: any, value: any) => any; } = {

        agent:(obj:any, value:any)=>false// solo asignable desde servidor aunque presente aqui para busquedas por referencia
    };

    public override valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        // como hay otros objetos de inventario con la misma estructura primero siempre comprobar que sea una empresa

       if(!this.validations.type_valid(obj,'type')) return false

       return super.valueIsValid(obj,key)
    }

    private valid_agent(obj:any){

        const agent = this.getValue(obj,'agent');
        return (this.getValue(obj,'id') == 'nuevo' && agent === 1) || !isNaN(agent);
    }



    private get_passengers_list(pax:any[]){

        
        let str = '', num;
        const   singulars = ['adulto', 'nino', 'infante'],
                plurals = ['adultos', 'ninos', 'infantes'];

        console.log(pax);

        return (pax || []).reduce((strPax:string,el:number, i:number)=>{

            num = Number(el);

            if(num > 0 ){

                str = '' +  num + ' ' + (num > 1 ? plurals[i]:singulars[i]);

                return strPax + (i != 0 ? ', ' : '') + str;
            }

            return strPax;

        }, '')

    }


}
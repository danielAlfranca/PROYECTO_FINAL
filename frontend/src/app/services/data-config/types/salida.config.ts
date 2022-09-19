import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";
import { DatePipe } from "@angular/common";
import { PassengerConfig } from "./passenger.config";
import { DataConfigService } from "../data-config.service";

@Injectable({
    providedIn: 'root' 
  })
export class SalidaConfig extends DataConfig{
   
    

    protected override validations = {

        ...this.common_validations,
        type_valid: (obj:any, key:string) => this.getValue(obj,key) == 2,
        agent_valid:(obj:any, key:string) => this.valid_agent(obj)     

    }
    constructor(protected override injector:Injector,private datePipe:DatePipe ){ super(injector); }

    protected override getters = {

        tour_name:(obj:any)=>this.getRef('tour',this.getValue(obj,'tour_id') ,'nombre'),

        operators_list:(obj:any)=> {

            const operators = (this.getValue(obj,'operadores')), service = this.injector.get(DataConfigService);

            return operators.map((e:any)=>service.getValue(e,'operator_name','operadorActivity')).join(', ')
        },

        passengers_total_list:(obj:any)=>this.paxTotalList(obj),

        date_start:(obj:any)=>  this.datePipe.transform(this.getByPath(obj,this.getKey('date_start') ), 'dd/MM/yy'),
        
        date_end:(obj:any)=>  this.datePipe.transform(this.getByPath(obj,this.getKey('date_end') ), 'dd/MM/yy'),

        time_start:(obj:any)=>  ((this.getByPath(obj,this.getKey('time_start') ) || '').split(":")).slice(0,-1).join(':'),
        
        time_end:(obj:any)=>  ((this.getByPath(obj,this.getKey('time_end')) || '').split(":") ).slice(0,-1).join(':')

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

    private paxTotalList(obj:any){

        let adultos, ninos, infantes, service = this.injector.get(PassengerConfig);

        const pax = [...(this.getValue(obj,'pax') || [])].reduce((arr,item)=>{
            
            adultos = service.getValue(item,'adultos')||0;
            ninos = service.getValue(item,'ninos')||0;
            infantes = service.getValue(item,'infantes')||0;

            return ([arr[0]+Number(adultos), arr[1]+Number(ninos), arr[2]+Number(infantes)]);
        
        }, [0,0,0]);


        return this.get_passengers_list(pax)

    }

    private get_passengers_list(pax:any[]){

        
        let str = '', num;
        const   singulars = ['adulto', 'nino', 'infante'],
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
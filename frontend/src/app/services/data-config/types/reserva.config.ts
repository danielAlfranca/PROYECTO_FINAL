import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";

@Injectable({
    providedIn: 'root' 
  })
export class ReservaConfig extends DataConfig{   

    protected override validations = {

        ...this.common_validations,
        type_valid: (obj:any, key:string) => this.getValue(obj,key) == 1,
        agent_valid_id:(obj:any, key:string) => this.valid_agent_id(obj)     

    }
    constructor(protected override injector:Injector, private datePipe:DatePipe){ super(injector); }

    protected override getters = {

        full_name:(obj:any)=>this.getValue(obj,'name') + ' ' + this.getValue(obj,'surname'),

        full_dates:(obj:any)=>this.getValue(obj,'date_start') + ' - ' + this.getValue(obj,'date_end'),

        paquete_name:(obj:any)=>this.get_paquete_name(obj),

        provider_name:(obj:any)=>this.get_provider_name(obj),

        passengers_list:(obj:any)=>this.get_passengers_list(obj),

        has_tours:(obj:any)=>this.has_activity(obj,1),

        has_hotels:(obj:any)=>this.has_activity(obj,2),

        has_traslados:(obj:any)=>this.has_activity(obj,3),       

        date_start:(obj:any)=>  this.datePipe.transform(this.getByPath(obj,this.getKey('date_start') ), 'dd/MM/yy'),
        
        date_end:(obj:any)=>  this.datePipe.transform(this.getByPath(obj,this.getKey('date_end') ), 'dd/MM/yy')
        
        
    }

    protected override setters: { [key: string]: (obj: any, value: any) => any; } = {

        agent:(obj:any, value:any)=>false// solo asignable desde servidor aunque presente aqui para busquedas por referencia
    };

    public override valueIsValid(obj:any,key:string):boolean{ // VALIDA PROPIEDAD

        // como hay otros objetos de inventario con la misma estructura primero siempre comprobar que sea una empresa

       if(!this.validations.type_valid(obj,'type')) return false

       return super.valueIsValid(obj,key)
    }

    private valid_agent_id(obj:any){

        const agent = this.getValue(obj,'agent_id');
        return (this.getValue(obj,'agent_id') == 'nuevo') || !isNaN(agent);
    }

    private get_paquete_name(obj:any){ // falta

        const   destination = this.getValue(obj,'destination'), 
                days = this.getPaqueteDays(obj);

        return destination + ' - ' + (days)+'D/'+(days-1)+'N';
    }

    private getPaqueteDays(obj:any){

        let date1 = new Date(this.getByPath(obj,this.getKey('date_start'))), date2 = new Date(this.getByPath(obj,this.getKey('date_end')));
          
        // To calculate the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();
          
        // To calculate the no. of days between two dates
        return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
        
    }

    private get_provider_name(obj:any){

        const   agentID = this.getValue(obj,'provider_id');

        
        switch (true) {

            case agentID==2:return 'cliente propio';
                            
            default: return this.getRef('empresa',agentID,'nombre','agent');
        }        
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

    private has_activity(obj:any, typeNum:number){

        const services = this.getValue(obj, 'activities') || {1:[],2:[],3:[]}; 
        
        return Array.isArray (services[typeNum]) &&  services[typeNum].length > 0;
    }


}
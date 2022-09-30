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

        passengers:(obj:any)=>this.getPassengers(obj),

        full_name:(obj:any)=>this.getRef('reserva',this.getValue(obj,'id') ,'full_name'),

        provider_name:(obj:any)=>this.getRef('reserva',this.getValue(obj,'id') ,'provider_name'),

        phones_list:(obj:any)=> this.getRef('reserva',this.getValue(obj, 'id'),'phones'),

        pax_list:(obj:any)=>this.get_passengers_list(this.getValue(obj,'passengers')),
        
        dates:(obj:any)=>this.getDates(obj),

        has_salida:(obj:any)=>this.hasSalida(obj)

    }

    protected override setters: { [key: string]: (obj: any, value: any) => any; } = {

        
    };

    private getTour(obj:any){

        const tours = (this.getRef('reserva',this.getValue(obj,'id'),'tours') || []),
              service = this.injector.get(AppConfigService).dataConfig;

        return tours.find((tour:any)=>service.getValue(tour, 'activity_index', 'tourActivity')==this.getValue(obj, 'activity'))     
    }

    private getPassengers(obj:any){

        const pax = this.getByPath(obj,this.getKey("passengers")) || [];

        if(pax.length) return pax;

        const tour:any = this.getTour(obj),
              service = this.injector.get(AppConfigService).dataConfig;

        return service.getValue(tour,'pax','tourActivity');

    }

    private hasSalida(obj:any){

        const tour:any  = this.getTour(obj);
        return this.injector.get(AppConfigService).dataConfig.getValue(tour,'salida_id','tourActivity');
    }


    private getDates(obj:any){

        const   service = this.injector.get(AppConfigService).dataConfig,
                tour:any  = this.getTour(obj),
                tourDate = service.getValue(tour,'date_start','tourActivity'),
                salidaId = service.getValue(tour,'salida_id','tourActivity'),
                salidaDate = this.getRef('salida',salidaId,'date_start');

    

        return {

            reserva:format(parse(tourDate, 'yyyy-MM-dd', new Date() ),"dd-MM-yy"),
            programada:format(parse(salidaDate, 'yyyy-MM-dd', new Date() ),"dd-MM-yy")
        };
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
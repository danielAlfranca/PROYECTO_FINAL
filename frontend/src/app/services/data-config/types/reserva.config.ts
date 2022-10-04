import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { format, parse } from "date-fns";
import { DataTypes } from "src/app/interfaces/types/data-config";
import { AppConfigService } from "../../app-config.service";
import { DataConfig } from "../model";

@Injectable({
    providedIn: 'root' 
  })
export class ReservaConfig extends DataConfig{   

    protected override validations:any = {

        ...this.validations,        
        user_valid:(obj:any, key:string) => true     

    }
    constructor(protected override injector:Injector, private datePipe:DatePipe){ super(injector); }

    protected override getters = {

        paquete_name:(obj:any)=>this.get_paquete_name(obj),

        provider_name:(obj:any)=>this.get_provider_name(obj),

        passengers_list:(obj:any)=>this.get_passengers_list(obj),

        tours:(obj:any)=>this.getActivities(obj,'tourActivity'),

        hotels:(obj:any)=>this.getActivities(obj,'hotelActivity'),        

        has_tours:(obj:any)=>this.has_activity(obj,'tourActivity'),

        has_hotels:(obj:any)=>this.has_activity(obj,'hotelActivity'),

        duracion:(obj:any)=>this.getPaqueteDays(obj)
             
    }

    


    private get_paquete_name(obj:any){ // falta

        const   destination = this.getValue(obj,'destino'), 
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

        const   agentID = this.getValue(obj,'proveedor');

        
        switch (true) {

            case agentID==1:return 'cliente propio';
                            
            default: return this.getRef('empresa',agentID,'nombre');
        }        
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

    private has_activity(obj:any, type:DataTypes){       
        
        return (this.getActivities(obj,type) || []).length;
    }

    private getActivities(obj:any, activity:DataTypes){

        const   service = this.injector.get(AppConfigService),
        list = Object.values(service.queries.section(activity) || {}),
        id = this.getValue(obj,'id');

        return list.filter((e:any)=>service.dataConfig.getValue(e,'reserva',activity)==id)
    }


   

    


}
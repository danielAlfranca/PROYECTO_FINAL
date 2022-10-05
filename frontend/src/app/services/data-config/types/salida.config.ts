import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";
import { DatePipe } from "@angular/common";
import { PassengerConfig } from "./passenger.config";
import { DataConfigService } from "../data-config.service";
import { format, parse } from "date-fns";
import { DataTypes } from "src/app/interfaces/types/data-config";
import { AppConfigService } from "../../app-config.service";

@Injectable({
    providedIn: 'root' 
  })
export class SalidaConfig extends DataConfig{
   
    
    constructor(protected override injector:Injector,private datePipe:DatePipe ){ super(injector); }

    protected override getters = {

        tour_name:(obj:any)=>this.getRef('tour',this.getValue(obj,'tour') ,'nombre'),

        operadores:(obj:any)=>this.getActivities(obj,'operadorActivity'),

        guiados:(obj:any)=>this.getActivities(obj,'guiadoActivity'),

        chofers:(obj:any)=>this.getActivities(obj,'choferActivity'),

        pasajeros_clientes:(obj:any)=>this.getActivities(obj,'tourActivity'),

        pasajeros_no_clientes:(obj:any)=>this.getActivities(obj,'passenger'),

        operators_list:(obj:any)=> {

            const operators = (this.getValue(obj,'operadores')), service = this.injector.get(DataConfigService);

            return operators.map((e:any)=>service.getValue(e,'operator_name','operadorActivity')).join(', ')
        },

        passengers_total_list:(obj:any)=>this.paxTotalList(obj)      

    }


    private getActivities(obj:any, activity:DataTypes){

        const   service = this.injector.get(AppConfigService),
        list = Object.values(service.queries.section(activity) || {}),
        id = this.getValue(obj,'id');

        return list.filter((e:any)=>Number(service.dataConfig.getValue(e,'salida',activity))==Number(id))
    }

   

    private paxTotalList(obj:any){

        let  service = this.injector.get(AppConfigService).dataConfig;

        let   clientes = (this.getValue(obj,'pasajeros_clientes') || []).map((e:any)=>service.getValue(e,'pasajeros','tourActivity')), 
              noClientes = (this.getValue(obj,'pasajeros_no_clientes') || []).map((e:any)=>service.getValue(e,'pasajeros','passenger')),
              pax = [...clientes,...noClientes].map(e=>e.split('.')).reduce((arr,item)=>{
           
       
            return ([arr[0]+Number(item[0]), arr[1]+Number(item[1]), arr[2]+Number(item[2])]);
        
        }, [0,0,0]);

 
        return this.get_passengers_list(pax.join('.'))

    }

    private get_passengers_list(pax:string){

        let str = '', num;
        const   arr:any = pax.split('.'),
                singulars = ['adulto', 'nino', 'infante'],
                plurals = ['adultos', 'ninos', 'infantes'], list =  arr.reduce((strPax:string,el:number, i:number)=>{

            num = Number(el);

            if(num > 0 ){

                str = '' +  num + ' ' + (num > 1 ? plurals[i]:singulars[i]);

                return strPax + (i != 0 ? ', ' : '') + str;
            }

            return strPax;

        }, '')    

        return list;
    }




 



}
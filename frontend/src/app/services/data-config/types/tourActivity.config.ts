import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { AppConfigService } from "../../app-config.service";
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

        associated_salida: (obj:any)=>this.get_associated_salida(obj)
        
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

    get_associated_salida(obj:any){

         const  service = this.injector.get(AppConfigService),
                salidas = service.queries.section('salida') || [],
                id = this.getValue(obj,'id'),
                activity= this.getValue(obj,'activity_index');

        let pax, salida = salidas.find((salida:any)=>{

            pax = service.dataConfig.getValue(salida,'pax','salida') || [];

            return pax.find((passenger:any)=>{


                return  service.dataConfig.getValue(passenger,'id','passenger') == id &&
                        service.dataConfig.getValue(passenger,'activity','passenger') == activity 
            }) != -1;
      
          }) 

        return salida!==-1 ? salida : false
        
    }
   

}
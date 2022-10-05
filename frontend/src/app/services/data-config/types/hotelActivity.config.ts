import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";

@Injectable({
    providedIn: 'root' 
  })

export class HotelActivityConfig extends DataConfig{
   
    constructor(protected override injector:Injector){ super(injector); }

    protected override getters:any = { 

        hotel_nombre:(obj:any)=> this.getRef('hotel',this.getValue(obj, 'hotel'),'nombre')        
    }

    protected override validations:any = {

        ...this.validations,
        habitaciones_valid:  (obj:any, key:string) =>  {

            let list = ((this.getValue(obj, key)) || '').split('-'), room, valid =true;

            list.forEach((value:any)=>{       

                room = value.split(".");

                if(room.length!=2) valid = false;

                if(Number(room[0])<1 || Number(room[1])<1) valid = false;                           

            });

            return valid;               
        },
        
    }
  
}
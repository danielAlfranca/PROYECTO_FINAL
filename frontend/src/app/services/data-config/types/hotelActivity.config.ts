import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";

@Injectable({
    providedIn: 'root' 
  })

export class HotelActivityConfig extends DataConfig{
   
    constructor(protected override injector:Injector){ super(injector); }

    protected override getters:any = { 

        ...this.getters,

        hotel_nombre:(obj:any)=> this.getRef('hotel',this.getValue(obj, 'hotel'),'nombre'),
        
    }
}
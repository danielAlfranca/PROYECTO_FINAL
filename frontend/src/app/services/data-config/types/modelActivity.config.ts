import { DatePipe } from "@angular/common";
import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";


export class ActivityConfig extends DataConfig{

    activitType!:number

    constructor(protected override injector:Injector, protected datePipe:DatePipe){ super(injector); }

    protected override validations = {

        ...this.common_validations,
        type_valid: (obj:any, key:string) => this.getValue(obj,key) ==  this.activitType,
        agent_valid:(obj:any, key:string) => this.valid_agent(obj)   

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

        duracion:(obj:any)=>this.getDuracion(obj),

    }

    private valid_agent(obj:any){

        const agent = this.getValue(obj,'agent');
       /*  return (this.getValue(obj,'id') == 'nuevo' && agent === 1) || !isNaN(agent); */

       return true
    }

    getDuracion(obj:any){

        let date1 = new Date(this.getByPath(obj,this.getKey('date_start'))), date2 = new Date(this.getByPath(obj,this.getKey('date_end')));
          
        // To calculate the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();
          
        // To calculate the no. of days between two dates
        return Math.floor(Difference_In_Time / (1000 * 3600 * 24)) + 1;

    }

}
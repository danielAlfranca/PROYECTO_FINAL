import { Injectable } from '@angular/core';
import { EmpresaConfig } from './types/empresa.config';
import { TourConfig } from './types/tour.config';
import { HotelConfig } from './types/hotel.config';
import { TrabajadorConfig } from './types/trabajador.config';

@Injectable({
  providedIn: 'root'
})

export class DataConfigService {

  private types:any =  {

    empresa:this.empresa,
    tour:this.tour,
    hotel:this.hotel,
    trabajador:this.trabajador 

  };

  constructor(
    private empresa:EmpresaConfig,
    private tour:TourConfig, 
    private hotel:HotelConfig, 
    private trabajador:TrabajadorConfig ) {}

  public setValue(object:any, propertyName:string, dataType:string, value:any):any{

    return this.types[dataType].setValue(object,propertyName,value)
  }

  public getValue(object:any, propertyName:string, dataType:string):any{

    return this.types[dataType].getValue(object,propertyName);
  }

  
}

import { Injectable } from '@angular/core';
import { EmpresaConfig } from './types/empresa.config';
import { TourConfig } from './types/tour.config';
import { HotelConfig } from './types/hotel.config';
import { TrabajadorConfig } from './types/trabajador.config';
import { DataTypes } from 'src/app/interfaces/types/data-config';

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

    return this.types[dataType].setValue(object,value,propertyName)
  }

  public getValue(object:any, propertyName:string, dataType:string):any{

    return this.types[dataType].getValue(object,propertyName);
  }

  public getModel(dataType:string):any{

    return this.types[dataType].getModel(dataType);
  }

  public validate(object:any, dataType:string){

    return this.types[dataType].objectIsValid(object);
  }

  public validateProperty(object:any, propertyName:string, dataType:string){

    return this.types[dataType].valueIsValid(object,propertyName);
  }

  public getValidations(obj:any, key:string, type:string){

    return this.types[type].getErrorsList(obj, key)
  }

  public isNewItem(object:any,dataType:string):any{

    return this.getValue(object,'id', dataType) == 'nuevo'
  }

  public initConfig(keys:any){

    (Object.keys(keys)).forEach((key) => this.types[key].init(keys[key])); 
  }


  
}

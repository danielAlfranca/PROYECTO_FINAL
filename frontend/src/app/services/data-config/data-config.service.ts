import { Injectable } from '@angular/core';
import { InventoryConfig } from './types/inventory.config';

@Injectable({
  providedIn: 'root'
})
export class DataConfigService {

  private types:any;

  constructor(private inventario:InventoryConfig) {

    this.types = {

      inventario:this.inventario
    }
   }

  public setValue(object:any, propertyName:string, dataType:string, value:any):any{

    return ''
  }

  public getValue(object:any, propertyName:string, dataType:string):any{

    return this.types[dataType].getValue(object,propertyName);
  }
}

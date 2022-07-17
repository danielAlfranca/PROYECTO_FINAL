import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataConfigService {

  private types:any;

  constructor() { }

  public setValue(object:any, propertyName:string, dataType:string, value:any):any{

    return ''
  }

  public getValue(object:any, propertyName:string, dataType:string):any{

    return ''
  }
}

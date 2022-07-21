import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import { DataConfigService } from '../data-config/data-config.service';


@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private _store:any = {};

  get empresa(){
   
    return this._store.empresa 
  }

  get trabajador(){

    return this._store.trabajador 
  }

  get tour(){

    return this._store.tour 
  }

  get hotel(){

    return this._store.hotel 
  }

  get paquete(){

    return this._store.paquete 
  }

  get salida(){

    return this._store.salida 
  }

  get reserva(){

    return this._store.reserva  
  }
  get pago(){

    return this._store.pago 
  }

  constructor(private injector:Injector) { }

  save(data:any){ console.log(data); this._store = data; }

  private filter(obj:any,func:Function){ 

    return _.pickBy(obj, func)
  }




}

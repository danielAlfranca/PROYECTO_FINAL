import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import { DataTypes } from 'src/app/interfaces/types/data-config';
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

  get passenger(){

    return this._store.passenger 
  }

  get tour(){

    return this._store.tour 
  }

  get tourActivity(){

    return this._store.tourActivity 
  }

  get hotel(){

    return this._store.hotel 
  }

  get hotelActivity(){

    return this._store.hotelActivity 
  }

  get paquete(){

    return this._store.paquete 
  }

  get salida(){

    return this._store.salida 
  }

  get operadorActivity(){

    return this._store.operadorActivity 
  }

  get guiadoActivity(){

    return this._store.guiadoActivity 
  }

  get choferActivity(){

    return this._store.choferActivity 
  }

  get reserva(){

    return this._store.reserva  
  }
  get pago(){

    return this._store.pago 
  }

  constructor(private injector:Injector) { }

  save(data:any){ this._store = data; }

  find(section:string, value:string|number, path:string){

    if(this.isID(path)) return this[section as keyof DataStoreService][value]

    return _.find(this[section as keyof DataStoreService],path)
  }

  addItem(section:DataTypes, item:any){

    const id = this.injector.get(DataConfigService).getValue(item,'id',section);

    this[section as keyof DataStoreService][id]= item;
  }

  removeItem(section:DataTypes, item:any){

    const id = this.injector.get(DataConfigService).getValue(item,'id',section);

    delete this[section as keyof DataStoreService][id];
        
  }

  private isID(path:string){

    return !path.includes('.')

  }



}

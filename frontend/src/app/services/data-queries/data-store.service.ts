import { Injectable } from '@angular/core';
import { DataConfigService } from '../data-config/data-config.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private _store:any;

  get empresas(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'es_empresa','inventario'))
  }

  get tours(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'es_tour','inventario'))
  }

  get hoteles(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'es_tour','inventario'))
  }

  get paquetes(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'es_tour','inventario'))
  }


  constructor(private dataConfig:DataConfigService) { }

  store(data:any){

    this._store = this.createIndexedObject(data);
  }

  private createIndexedObject(data:any){

    let id:number;

    return Object.keys(data).reduce((sections, sectionName)=>{

      sections[sectionName] = data[sectionName].reduce((section:any,item:any)=>{

        id = this.dataConfig.getValue(item,'id',sectionName);

        section[id] = item;

        return section;
  
      }, {} as any);

    }, {} as any);

  }


  private filterObject(obj:any,func:Function){

    return Object.keys(obj||{}).filter(key=>func(obj[key])).reduce((newObj:any,key:string)=>{

        newObj[key] = obj[key];
        return newObj
    },{})
  }




}

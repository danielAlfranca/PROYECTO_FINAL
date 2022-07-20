import { Injectable } from '@angular/core';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { DataConfigService } from '../data-config/data-config.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private _store:any;


  get inventario(){

    return this.filterObject(this._store.inventario, (val:any)=>true)
  }

  get empresa(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'is_empresa','inventario'))
  }

  get tour(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'is_tour','inventario'))
  }

  get hotel(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'is_hotel','inventario'))
  }

  get paquete(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'es_paquete','inventario'))
  }

  get salida(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'es_paquete','inventario'))
  }

  get reserva(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'es_paquete','inventario'))
  }
  get pago(){

    return this.filterObject(this._store.inventario, (val:any)=>this.dataConfig.getValue(val,'es_paquete','inventario'))
  }



  constructor(private dataConfig:DataConfigService) { }

  save(data:any){

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

      return sections;

    }, {} as any);

  }


  private filterObject(obj:any,func:Function){

    return Object.keys(obj||{}).filter(key=>func(obj[key])).reduce((newObj:any,key:string,index:number)=>{

        newObj[index] = obj[key];
        
        return newObj
    },[])
  }




}

import { Injectable } from '@angular/core';
import { DataStoreService } from './data-store.service';
import {HttpClient} from "@angular/common/http";
import { Observable, Subject, take } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';

@Injectable({
  providedIn: 'root' 
})
export class DataService {

  public get $dataUpdates():Observable<undefined>{ return this.$_dataUpdates as Observable<any>; };

  private URI = "http://localhost/PROYECTO_FINAL/"

  private $_dataUpdates = new Subject<undefined>();

  constructor(private http:HttpClient,  private dataStore:DataStoreService) {}

  public dataSet(start?:string, end?:string){

    this.http.post(  this.URI + 'backend/shared/actions.php',{
 
      section:'appData',
      action:'dataSet',
      data:{}

    },{headers:{ 'content-type':'application/json'}} ).pipe(take(1)).subscribe((data:any)=>{ if(data){  this.store(data); }})

  }

  section(section:DataTypes){

    return this.dataStore[section]
  }

 find(section:DataTypes, value:string, property:string = 'id'){

    return this.dataStore.find(section, value,property);
 }

  save(section:string, item:any){}

  delete(section:string, item:any){}

  private store(data:any){

    this.dataStore.save(data);
    this.$_dataUpdates.next(undefined);

  }
}

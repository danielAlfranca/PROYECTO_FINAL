import { Injectable } from '@angular/core';
import { DataStoreService } from './data-store.service';
import {HttpClient} from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class DataService {

  public get $dataSets():Observable<any>{
  
    return this.$_dataSets as Observable<any>;
  };

  private URI = "http://localhost/PROYECTO_FINAL/"

  private $_dataSets:Observable<any> = new Subject<any>();

  constructor(private http:HttpClient,  private dataStore:DataStoreService) { }

  public dataSet(start?:string, end?:string){

    return this.http.post(  this.URI + 'backend/shared/actions.php',{

      section:'appData',
      action:'dataSet',
      data:{}

    },{headers:{ 'content-type':'application/json'}} ).subscribe(response=>{

      
    }


    )
  }

  getItem(section:string, id:string){}

  save(section:string, item:any){}

  delete(section:string, item:any){}
}

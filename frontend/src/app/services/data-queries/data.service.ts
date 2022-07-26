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

  public section(section:DataTypes){

    return this.dataStore[section]
  }

 public find(section:DataTypes, value:string, property:string = 'id'){

    return this.dataStore.find(section, value,property);
 }

  public dataSet(start?:string, end?:string){

    const data = start && end ? {start:start,end:end} : {};

    this.connect('appData','dataSet', data).subscribe((data:any)=>{ if(data){  this.store(data); }})

  }  

  public save(section:DataTypes, item:any):Observable<any>{

    const notification = new Subject();

    this.connect(section,'save',item).subscribe((data:any)=>{ 
      
      console.log(data);

      if(data){  this.addItem(section,data);  notification.next(data) } else notification.next(false); 
    
    })

    return notification as Observable<any>;    
  }

  delete(section:string, item:any){

    const notification = new Subject();

    this.connect(section,'delete',item).subscribe((data:any)=>{ 

      if(data){  this.removeItem(section,data);  notification.next(data) }
      else notification.next(false);
    })

    return notification as Observable<any>;  
  }


  public connect(section:string, action:string, data?:any){

    return this.http.post(  this.URI + 'backend/shared/controller.php',{
 
      section:section,
      action:action,
      data:data || {}

    },{headers:{ 'content-type':'application/json'}} ).pipe(take(1))
  }

  private store(data:any){

    this.dataStore.save(data);
    this.$_dataUpdates.next(undefined);

  }

  private addItem( section:DataTypes, data:any){

    this.dataStore.addItem(section, data);
    this.$_dataUpdates.next(undefined);

  }

  private removeItem(data:any, section:DataTypes){

//FALTA
   

  }
}

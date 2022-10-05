import { Injectable, Injector } from '@angular/core';
import { DataStoreService } from './data-store.service';
import {HttpClient} from "@angular/common/http";
import { Observable, Subject, take } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from '../app-config.service';
import { forEach } from 'lodash';

@Injectable({
  providedIn: 'root' 
})
export class DataService {

  public get $dataUpdates():Observable<undefined>{ return this.$_dataUpdates as Observable<any>; };

  private URI = "http://localhost/PROYECTO_FINAL/"

  private $_dataUpdates = new Subject<undefined>();
  

  constructor(private http:HttpClient,  private dataStore:DataStoreService, private injector:Injector) {}

  public section(section:DataTypes){

    return this.dataStore[section as keyof DataStoreService];
  }

 public find(section:DataTypes, value:string, property:string = 'id'){

    return this.dataStore.find(section, value,property);
 }

  public dataSet(dates:any=false){

    const notification = new Subject();  

    this.connect('appData','dataSet', dates).subscribe((data:any)=>{ 
      
      if(data){  
      
        this.store(data); 
        notification.next(data); 
        this.$_dataUpdates.next(undefined);
    
      }});

      return notification as Observable<any>;  

  }  

  public save(section:DataTypes, data:any, multidata=false):Observable<any>{

    const notification = new Subject();  

    this.connect(section,'save',data).subscribe((response:any)=>{   
   
      if(response){ 

        if(multidata){

          this.addItem(section,response.item);
       
          Object.keys(response.extra_data || {}).forEach((key:any)=>{

            response.extra_data[key].forEach((el:any)=>this.addItem(key,el));

          });

        }else{ this.addItem(section,response); console.log(section,response)}
              

        notification.next(response);
        this.$_dataUpdates.next(undefined); 
      
      } else{  notification.next(false)}; 
    
    })

    return notification as Observable<any>;    
  }

  delete(section:DataTypes, data:any){

    const notification = new Subject();

    this.connect(section,'delete',data).subscribe((response:any)=>{ 

      

      if(response){
        
        this.removeItem(section,response.item);  
  
        Object.keys(response.extra_data || {}).forEach((key:any)=>{ // para elementos donde se eliminan otros datos dependientes

          response.extra_data[key].forEach((el:any)=>this.removeItem(key,el));

        });

        notification.next(response); 
        this.$_dataUpdates.next(undefined);
      
      }else notification.next(false);
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

  public login(email:string,pass:string){

    return this.connect('login','log', {email:email, password:pass, type:'login'}).pipe(take(1))

  }

  public register(email:string,pass:string){

    return this.connect('login','register', {email:email, password:pass, type:'register'}).pipe(take(1))

  }

  public unlog(){

    return this.connect('login','unlog', {type:'unlog'})

  }

  private store(data:any){

    this.dataStore.save(data);

    console.log(data);
    
    this.$_dataUpdates.next(undefined);

  }

  private addItem( section:DataTypes, data:any){

    this.dataStore.addItem(section, data);

    setTimeout(()=>this.$_dataUpdates.next(data))
    

  }

  private removeItem( section:DataTypes, data:any){
    
    const  justHide = this.injector.get(AppConfigService).dataConfig.hasKey(data,section,'hidden');

    if(!justHide) this.dataStore.removeItem(section, data);
    else this.dataStore.addItem(section, data);
    
    setTimeout(()=>this.$_dataUpdates.next(data))
  }


}

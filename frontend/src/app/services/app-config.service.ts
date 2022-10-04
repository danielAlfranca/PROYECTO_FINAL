import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { CanvasService } from './canvas/canvas.service';
import { DataConfigService } from './data-config/data-config.service';
import { DataService } from './data-queries/data.service';
import { UserConfigService } from './user-config.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService { 

  get user(){ return this.userConfig }

  get queries(){ return this.dataQueries }

  get canvas(){ return this.canvasAdmin }

  get dataConfig(){ return this.dataConfigs }

  public  get appInit(){ return this._appInit }

  private _appInit = false;
  private _isAuthenticated = false;

  constructor(
    private dataQueries:DataService, 
    private userConfig:UserConfigService,
    private dataConfigs:DataConfigService,
    private canvasAdmin:CanvasService) { 

      this.dataQueries.login('_','_').subscribe((response:any)=>{
        
          if(response && !response.errors) this.init();
      });

    }

    init(){

      const isInit = new Subject();

      this.dataQueries.connect('AppConfig','initData').pipe(take(1)).subscribe((response) => { 

        this.dataConfigs.initConfig(response);
        
        this.dataQueries.dataSet().pipe(take(1)).subscribe((e:any)=>{this._appInit=true; isInit.next(true)});
      
      });

      return isInit as Observable<any>;

    }

    reset(){

      this.dataQueries.unlog().subscribe(e=>{
        
        e? this._appInit=false:null;

        console.log(e)
      
      })
    }
   
}

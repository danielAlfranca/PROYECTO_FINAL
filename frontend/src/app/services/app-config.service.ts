import { Injectable } from '@angular/core';
import { take } from 'rxjs';
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

  public  get appInit(){ return this._appInit &&  this._isAuthenticated }

  private _appInit = false;
  private _isAuthenticated = false;

  constructor(
    private dataQueries:DataService, 
    private userConfig:UserConfigService,
    private dataConfigs:DataConfigService,
    private canvasAdmin:CanvasService) { }

    init(){

      this.dataQueries.connect('AppConfig','initData').pipe(take(1)).subscribe((response) => { 
        
        this.dataConfigs.initConfig(response);
        
        this.dataQueries.dataSet();
      
        this.dataQueries.$dataUpdates.pipe(take(1)).subscribe((e:any)=>this._appInit=true);
      
      });

    }

    login(email:string,pass:string){

      this.dataQueries.login(email,pass).subscribe(e=>this.init());

    }

    unlog(email:string,pass:string){

      this.dataQueries.unlog().subscribe(e=>this._appInit=false);

    }
}

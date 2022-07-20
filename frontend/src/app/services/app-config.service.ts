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

  public  appInit(){ return this._appInit }

  private _appInit = false;

  constructor(
    private dataQueries:DataService, 
    private userConfig:UserConfigService,
    private dataConfigs:DataConfigService,
    private canvasAdmin:CanvasService) { 
      
      this.dataQueries.dataSet();
      
      this.dataQueries.$dataUpdates.pipe(take(1)).subscribe((e:any)=>this._appInit=true);

    }
}

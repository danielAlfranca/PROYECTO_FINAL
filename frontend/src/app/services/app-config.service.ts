import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
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

  constructor(
    private dataQueries:DataService, 
    private userConfig:UserConfigService,
    private dataConfigs:DataConfigService,
    private canvasAdmin:CanvasService) { }
}

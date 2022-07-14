import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { CanvasConfig, CanvasType} from '../../../../interfaces/canvas';

@Component({
  selector: 'app-header-canvas',
  templateUrl: './header-canvas.component.html',
  styleUrls: ['./header-canvas.component.scss']
})
export class HeaderCanvasComponent implements OnDestroy{

  @Input() index!:number;
  @Input() type!:CanvasType;

  public config!:CanvasConfig;

  private subscription!:Subscription;

  constructor(private appConfig:AppConfigService) {

    this.subscription = this.appConfig.canvas.routesChanges.subscribe(config => this.configHeader());
  }

  public close(){ this.appConfig.canvas.close(this.config) }

  private configHeader(){

    const last = this.appConfig.canvas.last;

    if(last.index==this.index&&last.type==this.type){ this.config = last; }
  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }

}

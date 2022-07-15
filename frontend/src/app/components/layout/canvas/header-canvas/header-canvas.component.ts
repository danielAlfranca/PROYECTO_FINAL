import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { CanvasConfig, CanvasType} from '../../../../interfaces/canvas';

@Component({
  selector: 'app-header-canvas',
  templateUrl: './header-canvas.component.html',
  styleUrls: ['./header-canvas.component.scss']
})
export class HeaderCanvasComponent {

  @Input() config!:CanvasConfig;

  constructor(private appConfig:AppConfigService) {}

  public close(){ this.appConfig.canvas.close(this.config) }

}

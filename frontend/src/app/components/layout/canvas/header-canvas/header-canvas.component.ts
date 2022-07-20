import { Component, Input,  OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { CanvasConfig} from '../../../../interfaces/canvas';

@Component({
  selector: 'app-header-canvas',
  templateUrl: './header-canvas.component.html',
  styleUrls: ['./header-canvas.component.scss']
})
export class HeaderCanvasComponent implements OnInit{

  @Input() config!:CanvasConfig;
  @Input() isFirstRoute?:boolean;

  icon = ''

  constructor(private appConfig:AppConfigService) {}

  ngOnInit(): void {  this.icon = this.isFirstRoute ? 'bi bi-x h2 m-0 p-0':'bi bi-chevron-double-left h4 m-0 p-0';   }

  public close(){ this.appConfig.canvas.close() }

}

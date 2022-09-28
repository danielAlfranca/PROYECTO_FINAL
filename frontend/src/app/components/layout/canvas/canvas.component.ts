import { Component, OnInit } from '@angular/core';
import { CanvasConfig } from 'src/app/interfaces/canvas';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent {

  asideIsActive = false;
  popUpIsActive = false;

  aside:CanvasConfig[] = [];
  popUp:CanvasConfig[] = [];

  popUpClass = ''

  constructor(private appConfig: AppConfigService) {
    
    this.appConfig.canvas.routesChanges.subscribe((canvasArr:CanvasConfig[]) => { 

        this.aside = canvasArr.filter(e=>e.type=='aside');
        this.popUp = canvasArr.filter(e=>e.type=='popUp');

        this.asideIsActive = this.aside.length>0;
        this.popUpIsActive = this.popUp.length>0;

        this.popUpClass = this.getPopUpClass();
        
     });
  }

  getPopUpClass(){

    if(!this.popUpIsActive) return ''

    const last:any = this.popUp[this.popUp.length-1];

    return last.size ? 'pop-up-' + last.size :'';

  }

}

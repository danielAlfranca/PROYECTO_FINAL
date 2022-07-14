import { Component, OnInit } from '@angular/core';
import { CanvasConfig } from 'src/app/interfaces/canvas';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  asideIsActive = false;
  popUpIsActive = false;

  constructor(private appConfig: AppConfigService) {
    
    this.appConfig.canvas.routesChanges.subscribe(() => { 


     });
  }

  ngOnInit(): void {
  }

}

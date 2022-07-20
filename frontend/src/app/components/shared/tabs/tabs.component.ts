import { Component, OnInit } from '@angular/core';
import { CanvasConfig } from 'src/app/interfaces/canvas';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  nextlink="";

  constructor(private appConfig:AppConfigService) {}

  ngOnInit(): void {

    setTimeout((e:any)=>{

      const currentPath = this.appConfig.canvas.last.path;

      // console.log(this.appConfig.canvas.canvasStatus, currentPath);

      switch (currentPath) {
        case 'reservas': {this.nextlink = 'ejemplo-1'; break;}
        case 'ejemplo-1': {this.nextlink = 'ejemplo-2'; break;}
        case 'ejemplo-2': {this.nextlink = 'ejemplo-3'; break;}
        case 'ejemplo-3': {this.nextlink = 'ejemplo-4'; break;}
        default: { this.nextlink = ''; break; }
      }     

    })

   
  }

  open(){ this.appConfig.canvas.open(this.nextlink) }

}

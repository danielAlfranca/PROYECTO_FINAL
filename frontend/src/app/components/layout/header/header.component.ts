import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  public title!:string;
  public icon!:string;

  constructor(private appConfig:AppConfigService) { 

    this.appConfig.canvas.routesChanges.subscribe(e=>{

      const last = this.appConfig.canvas.last;

      if(last.type=='primary') { this.title = last.title; this.icon = last.icon }

    })
  }

}

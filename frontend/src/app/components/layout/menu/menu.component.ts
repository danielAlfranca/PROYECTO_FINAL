import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSections } from 'src/app/interfaces/canvas';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public active = '';

  constructor(private appConfig: AppConfigService) { 

    this.appConfig.canvas.routesChanges.subscribe(config=> {

      const last = this.appConfig.canvas.last;

      if(last.type=='primary') { this.active = last.title}

    });
  }

  mobileMenu = false;

  appSections = [

    {icon:'bi bi-bookmark', title:'reservas'},
    {icon:'bi bi-truck', title:'salidas'},
    {icon:'bi bi-archive', title:'inventario'}

  ];

  ngOnInit(): void {

    
  }

  public changeSection(section:string){

    this.appConfig.canvas.open(section as AppSections);    
  }


}

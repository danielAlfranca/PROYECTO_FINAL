import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-tour',
  templateUrl: './display-tour.component.html',
  styleUrls: ['./display-tour.component.scss']
})
export class DisplayTourComponent extends DisplayAdminComponent implements OnInit {

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void { 
    
    this.init('tour');  

   
  }

  override updateDisplayData(item: any): void {
      
    this.dataDisplay = [

      {title:'nombre', value: this.value('nombre'), icon:'file-text'}, 
      {title:'inicio', value: this.value('inicio'), icon:'clock'}, 
      {title:'fin', value: this.value('fin'), icon:'clock'}, 
      {title:'duracion', value: this.value('duracion') + ' dias', icon:'span'}, 
      {title:'destino', value: this.value('destino'), icon:'map'}        
    ]
  
  }
}
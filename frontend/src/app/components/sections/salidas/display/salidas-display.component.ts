import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-salidas-display',
  templateUrl: './salidas-display.component.html',
  styleUrls: ['./salidas-display.component.scss']
})
export class SalidasDisplayComponent extends DisplayAdminComponent implements OnInit {

  passengers!:any;
  services!:any;

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init('salida'); }

  override updateDisplayData(item: any): void {
      
    this.dataDisplay = [

      {title:'Tour', value: this.value('tour_name'), icon:'camera'}, 
      {title:'Fecha', value: this.value('date_start'), icon:'calendar'}, 
      {title:'Horario', value: this.value('time_start') + ' - ' + this.value('time_end'), icon:'clock'}, 
      
    ];

    this.passengers = this.value('pax') || [];
    
  }

  showPax(item:any){

    this.appConfig.canvas.open('display-passenger', {displayItem:item});
  }






}

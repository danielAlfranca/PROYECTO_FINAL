import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-reservas-display',
  templateUrl: './reservas-display.component.html',
  styleUrls: ['./reservas-display.component.scss']
})
export class ReservasDisplayComponent extends DisplayAdminComponent implements OnInit {

  dataPaquete:any;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('reserva'); }

  override updateDisplayData(item: any): void {
      
    this.dataDisplay = [

      {title:'Nombre', value: this.value('full_name'), icon:'file-earmark-person'}, 
      {title:'Telefonos', value: this.value('phones'), icon:'phone'}, 
      {title:'Emails', value: this.value('emails'), icon:'envelope'}, 
      {title:'Proveedor', value: this.value('provider_name'), icon:'briefcase'}
    ];

    this.dataPaquete = [

      {title:'Destino', value: this.value('destination'), icon:'map'}, 
      {title:'Fechas', value: this.value('full_dates'), icon:'calendar'}, 
      {title:'Pasajeros', value: this.value('passengers_list'), icon:'people'}, 
    ];
  }
}


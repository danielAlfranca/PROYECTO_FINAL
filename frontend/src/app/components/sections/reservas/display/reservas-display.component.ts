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

    const tstart = this.value('time_start'), tend = this.value('time_end');
      
    this.dataDisplay = [

      {title:'Nombre', value: this.value('nombre') + ' ' +this.value('apellidos') , icon:'file-earmark-person'}, 
      {title:'Telefonos', value: this.value('telefonos'), icon:'phone'}, 
      {title:'Emails', value: this.value('emails'), icon:'envelope'}, 
      {title:'Proveedor', value: this.value('provider_name'), icon:'briefcase'}
    ];

    this.dataPaquete = [

      {title:'Destino', value: this.value('destino'), icon:'map'}, 
      {title:'Inicio', value: this.value('date_start')+ (tstart ? (' - '+ tstart):''), icon:'calendar'}, 
      {title:'Fin', value: this.value('date_end')+ (tend ? (' - '+ tend):''), icon:'calendar'}, 
      {title:'Pasajeros', value: this.value('passengers_list'), icon:'people'}, 
    ];
  }


}


import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-hotel',
  templateUrl: './display-hotel.component.html',
  styleUrls: ['./display-hotel.component.scss']
})
export class DisplayHotelComponent extends DisplayAdminComponent implements OnInit {

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void { 

    this.init('hotel');  
    
    this.dataDisplay = [

      {title:'Nombre', value: this.value('nombre'), icon:'house'}, 
      {title:'Tipo', value: this.value('tipo_categoria'), icon:'asterisk'}, 
      {title:'Direccion', value: this.value('direccion'), icon:'map'}, 
      {title:'telefonos', value: this.value('nombre_propietario'), icon:'briefcase'}
      
    ]
  
  }
}

import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-trabajador',
  templateUrl: './display-trabajador.component.html',
  styleUrls: ['./display-trabajador.component.scss']
})
export class DisplayTrabajadorComponent extends DisplayAdminComponent implements OnInit {

  nombre!:string;
  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void { 
    
    this.init('trabajador');  }

  override updateDisplayData(item: any): void {
      
    this.nombre = this.value('nombre_completo');
    
    this.dataDisplay = [

      {title:'Documento', value: this.value('documento'), icon:'file-text'}, 
      {title:'Tipo', value: this.value('tipo_nombre'), icon:'asterisk'}, 
      {title:'regimen', value: this.value('regimen_nombre'), icon:'cone-striped'}, 
/*       {title:'Direccion', value: this.value('direccion'), icon:'map'},  */
      {title:'telefonos', value: this.value('telefonos'), icon:'telephone'}, 
      {title:'emails', value: this.value('emails'), icon:'envelope'}
    ] 
  }
}


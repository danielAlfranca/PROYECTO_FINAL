import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-empresa',
  templateUrl: './display-empresa.component.html',
  styleUrls: ['./display-empresa.component.scss']
})
export class DisplayEmpresaComponent extends DisplayAdminComponent implements OnInit {

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void { 
    
    this.init('empresa');
  
  }

  override updateDisplayData(item: any): void {
      
    this.dataDisplay = [

      {title:'Nombre', value: this.value('nombre'), icon:'briefcase'}, 
      {title:'Documento', value: this.value('documento'), icon:'file-text'}, 
      {title:'Direccion', value: this.value('direccion'), icon:'file-text'}, 
      {title:'telefonos', value: this.value('telefonos'), icon:'telephone'}, 
      {title:'emails', value: this.value('emails'), icon:'envelope'}      
    ];
  }
}

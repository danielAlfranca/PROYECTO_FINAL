import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-operador',
  templateUrl: './display-operador.component.html',
  styleUrls: ['./display-operador.component.scss']
})
export class DisplayOperadorComponent extends DisplayAdminComponent implements OnInit {

  title!:string;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('operadorActivity'); }

  override updateDisplayData(item: any): void {
    
    this.title = "Servicio de Operador";     
    
  }

}

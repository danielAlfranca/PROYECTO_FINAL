import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-guiado',
  templateUrl: './display-guiado.component.html',
  styleUrls: ['./display-guiado.component.scss']
})
export class DisplayGuiadoComponent extends DisplayAdminComponent implements OnInit {

  title!:string;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('guiadoActivity'); }

  override updateDisplayData(item: any): void {
    
    this.title = "Servicio de guiado";     
    
  }

}

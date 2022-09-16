import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-chofer',
  templateUrl: './display-chofer.component.html',
  styleUrls: ['./display-chofer.component.scss']
})
export class DisplayChoferComponent extends DisplayAdminComponent implements OnInit {

  title!:string;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('choferActivity'); }

  override updateDisplayData(item: any): void {
    
    this.title = 'Servicio de Chofer';     
    
  }

}

import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-tour-activity-display',
  templateUrl: './tour-activity-display.component.html',
  styleUrls: ['./tour-activity-display.component.scss']
})
export class TourActivityDisplayComponent extends DisplayAdminComponent implements OnInit {

  title!:string;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('tourActivity'); }

  override updateDisplayData(item: any): void {

    
    this.title = this.appConfig.dataConfig.getValue(this.item,'tour_nombre', 'tourActivity');     
    
  }
}
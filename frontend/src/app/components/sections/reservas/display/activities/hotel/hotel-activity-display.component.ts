import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-hotel-activity-display',
  templateUrl: './hotel-activity-display.component.html',
  styleUrls: ['./hotel-activity-display.component.scss']
})
export class HotelActivityDisplayComponent extends DisplayAdminComponent implements OnInit {

  title!:string;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('hotelActivity'); }

  override updateDisplayData(item: any): void {
    
    this.title = this.appConfig.dataConfig.getValue(this.item,'hotel_nombre', 'hotelActivity');     
    
  }

}

import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-passenger',
  templateUrl: './display-passenger.component.html',
  styleUrls: ['./display-passenger.component.scss']
})
export class DisplayPassengerComponent extends DisplayAdminComponent implements OnInit {

  title!:string;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('passenger'); }

  override updateDisplayData(item: any): void {
    
    this.title = this.value('full_name');     
    
  }
}

import { Component, OnInit } from '@angular/core';
import { SectionAdminComponent } from 'src/app/components/shared/models/section-admin/section-admin.component';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-salidas-section',
  templateUrl: './salidas-section.component.html',
  styleUrls: ['./salidas-section.component.scss']
})
export class SalidasSectionComponent extends SectionAdminComponent  {

  protected override section = 'salida' as DataTypes;
  
  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  

}

import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-salidas-section',
  templateUrl: './salidas-section.component.html',
  styleUrls: ['./salidas-section.component.scss']
})
export class SalidasSectionComponent extends SectionComponent  {

  protected override section = 'salida' as DataTypes;
  
  constructor(protected override appConfig:AppConfigService) { super(appConfig)}

  

}

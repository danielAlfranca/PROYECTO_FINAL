import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-reservas-section',
  templateUrl: './reservas-section.component.html',
  styleUrls: ['./reservas-section.component.scss']
})
export class ReservasSectionComponent extends SectionComponent implements OnInit {

  protected override section = 'reserva' as DataTypes;
  
  constructor(protected override appConfig:AppConfigService) { super(appConfig)} 

   ngOnInit(): void {}

}

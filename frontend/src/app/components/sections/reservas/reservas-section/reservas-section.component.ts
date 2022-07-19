import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-reservas-section',
  templateUrl: './reservas-section.component.html',
  styleUrls: ['./reservas-section.component.scss']
})
export class ReservasSectionComponent extends SectionComponent implements OnInit {

  constructor(private appConfig:AppConfigService) { super()}

  override ngOnInit(): void {

    
  }

  open(){

    this.appConfig.queries.dataSet();
  }

}

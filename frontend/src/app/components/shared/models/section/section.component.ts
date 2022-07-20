import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-section',
  template: '',
  styles: ['']
})
export class SectionComponent {

  protected section!:DataTypes;
  protected subscription!:Subscription;

  constructor(protected appConfig:AppConfigService) {

    this.subscription = this.appConfig.queries.$dataUpdates.subscribe(e=>this.getSectionData());
  }

  protected getSectionData(){

    this.appConfig.queries.section(this.section);
  }
}

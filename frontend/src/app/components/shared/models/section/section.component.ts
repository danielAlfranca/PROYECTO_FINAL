import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { TableConfig } from 'src/app/interfaces/table';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-section',
  template: '',
  styles: ['']
})
export class SectionComponent implements OnDestroy{

  protected section!:DataTypes;
  protected tableConfig!:TableConfig;
  protected data!:any

  protected subscription!:Subscription;

  public tableSection!:string;

  constructor(protected appConfig:AppConfigService) {}

  protected getSectionData(){

    return this.appConfig.queries.section(this.section);
  }

  protected form(data:any = {}){

    this.appConfig.canvas.open('new-'+this.section, data);

    //.pipe(take(1)).subscribe(data=>this.display(data))
  }

  protected display(item:any, data:any = {}){

    const id = this.appConfig.dataConfig.getValue(item,'id',this.section);

    this.appConfig.canvas.open('display-'+this.section, {...{id:id},...data});
  }


  ngOnDestroy(){

    if (this.subscription) this.subscription.unsubscribe();
  }




  
}

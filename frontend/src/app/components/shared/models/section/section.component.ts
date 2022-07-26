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

  protected getData(section?:DataTypes){

    return this.appConfig.queries.section(section || this.section);
  }

  protected form(data?:any){

    this.appConfig.canvas.open('form-'+this.section, data).pipe(take(1)).subscribe(response=>{
      
      if(response) this.display(response, null)
    
    }) ;
  }

  protected display(item:any, data:any = {}, section?:string){

    this.appConfig.canvas.open('display-'+(section||this.section), {...{displayItem:item},...data});
  }


  ngOnDestroy(){

    if (this.subscription) this.subscription.unsubscribe();
  }




  
}

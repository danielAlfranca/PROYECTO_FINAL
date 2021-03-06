import { Component, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { TableConfig, TableSection } from 'src/app/interfaces/table';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-table-admin',
  template: '',
  styles: ['']
})
export class TableAdminComponent {

  protected type!:DataTypes;
  protected tableConfig!:TableConfig;

  protected subscription!:Subscription;

  constructor(protected appConfig:AppConfigService) {}

  protected init(sections:TableSection[]){

    this.tableConfig = this.createTable(sections);

    this.subscription = this.appConfig.queries.$dataUpdates.subscribe(e=>{
      
      this.tableConfig = this.createTable(sections);

    }) 
  }

  protected createTable(sections:TableSection[], hidePlusButton:boolean = false, hideSearchButton:boolean = false, extraButton={}){
  
    sections.forEach((tableSection:TableSection) => {

      tableSection.data = this.getData(tableSection.dataType as DataTypes);

    });

    return {

      ...extraButton,
      hidePlusButton,
      hideSearchButton,
      sections:sections
    }
  }

  protected getData(section?:DataTypes){

    return this.appConfig.queries.section(section || this.type);
  }

  protected form(data?:any){

    this.appConfig.canvas.open('form-'+this.type, data).pipe(take(1)).subscribe(response=>{
      
      if(response) this.display(response, null)
    
    });
  }

  protected display(item:any, data:any = {}, section?:string){

    this.appConfig.canvas.open('display-'+(section||this.type), {...{displayItem:item},...data});
  } 


  ngOnDestroy(){

    if (this.subscription) this.subscription.unsubscribe();
  }

}

import { Component, OnDestroy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Subscription, take } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import parse from 'date-fns/parse';

@Component({
  selector: 'app-calendar-admin',
  template: '',
  styles: ['']
})
export class CalendarAdminComponent implements OnDestroy{

  events!:CalendarEvent[];
  subscription!:Subscription;  

  urlDisplay!:string;
  urlForm!:string;

  constructor(protected appConfig: AppConfigService) { }

  protected init(){

    this.events = this.createSections();

    this.subscription = this.appConfig.queries.$dataUpdates.subscribe(e=>{
      
      this.events = this.createSections();

    }) 
  }

  createSections():any{

    return []
  }

  open(item?:any){

    return this.appConfig.canvas.open(item ? this.urlDisplay:this.urlForm, {displayItem:item});    
  }

  protected getData(section:DataTypes){

    return this.appConfig.queries.section(section);
  }

  table(url:string){

    this.appConfig.canvas.open(url)
  }

  ngOnDestroy(){

    if (this.subscription) this.subscription.unsubscribe();
  }

  parseDate(date:string, time?:string){

    if(!time) return parse(date, 'yyyy-MM-dd', new Date())

    return parse(date+ ' , ' +time, 'yyyy-MM-dd , HH:mm', new Date())
  }

  parseProp(item:any, prop:string, type:string){
  
    return this.appConfig.dataConfig.getValue(item,prop,type);
  }


}

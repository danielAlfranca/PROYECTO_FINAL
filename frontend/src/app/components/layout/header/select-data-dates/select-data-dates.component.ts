import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths } from 'date-fns';

@Component({
  selector: 'app-select-data-dates',
  templateUrl: './select-data-dates.component.html',
  styleUrls: ['./select-data-dates.component.scss']
})
export class SelectDataDatesComponent {

  spans = [

    'De esta semana en adelante',
    'De este mes en adelante',
    'De hace 2 meses en adelante',
    'Personalizado'

  ];

  constructor(private appConfig:AppConfigService) { }
 

  query(i:number){

    const title = this.spans[i];

    let query:any;

    switch (title) {

      case 'De esta semana en adelante': query = 'week' ;break;

      case 'De este mes en adelante': query =  'month';break;
        
      case 'De hace 2 meses en adelante':query =  '2 months';break;        
        
      default: return this.appConfig.canvas.open('seleccionar-rango-fecha-personalizado').pipe(take(1)).subscribe(()=>this.appConfig.canvas.close());
    
    }

    return this.getData(query);

  }

  private getData(dates:any){

    const query = this.appConfig.queries.dataSet(dates);

    this.appConfig.canvas.open('loading-2',{query:query}).pipe(take(1)).subscribe(()=>this.appConfig.canvas.close());

    return query
  }

   
 

}

import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths } from 'date-fns';

@Component({
  selector: 'app-select-data-dates',
  templateUrl: './select-data-dates.component.html',
  styleUrls: ['./select-data-dates.component.scss']
})
export class SelectDataDatesComponent implements OnInit {

  spans = [

    'De esta semana en adelante',
    'De este mes en adelante',
    'De hace 2 meses en adelante',
    'Personalizado'

  ];


  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {
  }

  query(i:number){

    const title = this.spans[i];

    switch (title) {

      case 'Personalizado': return this.appConfig.canvas.open('seleccionar-rango-fecha-personalizado').pipe(take(1)).subscribe(res=>this.appConfig.canvas.close())
        
      default: return this.appConfig.canvas.close(this.getDates(title))

    }
  }

  private getDates(title:string){

    let dates;
    switch (title) {

      case 'De esta semana en adelante': dates =  [startOfWeek(new Date())] ; break;

      case 'De este mes en adelante': dates =  [startOfMonth(new Date())] ; break;
        
      case 'De hace 2 meses en adelante': dates =  [subMonths(startOfMonth(new Date()),1)] ; break;  
      
      default: dates = [new Date()]; break;  
      
    }

    return {

      start:format(dates[0],'yyyy-mm-dd'),
      end: dates[1] ? format(dates[1],'yyyy-mm-dd'):null
    }
  }

}

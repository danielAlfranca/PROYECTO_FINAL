import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-select-custom-date',
  templateUrl: './select-custom-date.component.html',
  styleUrls: ['./select-custom-date.component.scss']
})
export class SelectCustomDateComponent  {

  start!:any
  end!:any;
  
  constructor(private appConfig:AppConfigService) { }

  response(){

    let date:any = {}

    if(this.start) date.start = this.start;
    if(this.end) date.end = this.end;
    
    this.getData(date);
    
  }

  private getData(dates:any){

    const query = this.appConfig.queries.dataSet(dates);

    this.appConfig.canvas.open('loading-3',{query:query}).pipe(take(1)).subscribe(()=>this.appConfig.canvas.close());

    return query
  }


}

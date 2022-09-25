import { Component, OnInit } from '@angular/core';
import { startCase } from 'lodash';
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

    this.appConfig.canvas.close({start:this.start, end:this.end})
    
  }

  aver(e:any){

    console.log(e)
  }

}

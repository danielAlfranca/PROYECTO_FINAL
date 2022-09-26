import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-new-reserva-activity',
  templateUrl: './new-reserva-activity.component.html',
  styleUrls: ['./new-reserva-activity.component.scss']
})
export class NewReservaActivityComponent {

  options = [

    {name:'Tour', icono:'camera', path:'form-activity-tourActivity', type:'tourActivity'},
    {name:'Hotel', icono:'house', path:'form-activity-hotelActivity', type:'hotelActivity'},
  ]
  constructor(private appConfig:AppConfigService) { }

  open(option:any){

    const outlet = this.appConfig.canvas.last.outlet;

    this.appConfig.canvas.open(option.path +(outlet=="aside-2" ? '':"-2"), {formItem:null}).pipe(take(1)).subscribe(response=>{      
      
      if(response) this.appConfig.canvas.close({item:response, type:option.type})
    
    });
  }

}

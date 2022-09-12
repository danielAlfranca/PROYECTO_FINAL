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

    {name:'Tour', icono:'camera', path:'new-form-tour-activity', type:'tourActivity'},
    {name:'Hotel', icono:'house', path:'new-form-hotel-activity', type:'hotelActivity'},
  ]
  constructor(private appConfig:AppConfigService) { }

  open(option:any){

    this.appConfig.canvas.open(option.path, {formItem:null}).pipe(take(1)).subscribe(response=>{      
      
      if(response) this.appConfig.canvas.close({item:response, type:option.type})
    
    });
  }

}

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

    {name:'Tour', icono:'camera', path:'form-tourActivity-2', type:'tourActivity'},
    {name:'Hotel', icono:'house', path:'form-hotel-Activity-2', type:'hotelActivity'},
  ]
  constructor(private appConfig:AppConfigService) { }

  open(option:any){

    this.appConfig.canvas.open(option.path, {formItem:null}).pipe(take(1)).subscribe(response=>{      
      
      if(response) this.appConfig.canvas.close({item:response, type:option.type})
    
    });
  }

}

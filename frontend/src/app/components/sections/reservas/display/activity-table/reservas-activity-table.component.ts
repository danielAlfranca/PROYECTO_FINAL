import { Component, OnChanges, Input } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-reservas-activity-table',
  templateUrl: './reservas-activity-table.component.html',
  styleUrls: ['./reservas-activity-table.component.scss']
})
export class ReservasActivityTableComponent implements OnChanges {

  @Input() reserva!:any
  @Input() mode!:string;

  tours:any;
  hoteles:any;

  activities:any

  constructor(protected appConfig: AppConfigService) {  }

  ngOnChanges(): void {

    const tours = this.getTours();
    const hoteles = this.getHoteles();


    this.activities = tours.concat(hoteles)

  }

  getTours(){

    return (this.appConfig.dataConfig.getValue(this.reserva,'tours','reserva') || []).map((e:any)=>({item:e,type:'tourActivity'}))

  }

  getHoteles(){

    return (this.appConfig.dataConfig.getValue(this.reserva,'hotels','reserva')|| []).map((e:any)=>({item:e,type:'hotelActivity'}))
  }

  open(item?:any, section?:string){
    
    if(this.mode=='display') return this.appConfig.canvas.open('display-' +section , {displayItem:item});

   /*  return this.appConfig.canvas.open(this.getFormUrl(section, item) , {formItem:item}).pipe(take(1)).subscribe((response:NewActivity)=>{
      
      if(response) {
        
        this.activitiesUpdated.emit(this.updateActivityOnDataGroup(response))
      };
    
    }); */

    return
    
  }

}

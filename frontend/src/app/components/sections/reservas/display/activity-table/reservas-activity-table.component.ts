import { Component, OnChanges, Input, Output } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-reservas-activity-table',
  templateUrl: './reservas-activity-table.component.html',
  styleUrls: ['./reservas-activity-table.component.scss']
})
export class ReservasActivityTableComponent {

  @Input() activities!:any
  @Input() mode!:string;

  constructor(protected appConfig: AppConfigService) {  }


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

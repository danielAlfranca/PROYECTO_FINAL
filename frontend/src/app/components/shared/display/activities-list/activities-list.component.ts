import {  Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { take } from 'rxjs';
import {  NewActivity } from 'src/app/interfaces/activities';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';


@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styles: ['']
})
export class ActivitiesListComponent implements OnChanges{

  @Input() type!:DataTypes;
  @Input() mode!:string;
  @Input() data!:any;
  @Input() index!:any;// for edit url
  @Output() activitiesUpdated = new EventEmitter();

  activities:any;
  columns:any;

  constructor(protected appConfig:AppConfigService) {   } 

  ngOnChanges(): void {

    this.activities = this.getList(); 

    this.columns = this.type == 'reserva' ? ['Actividad','Fecha']:['Provedor','Servicio'];

  }

  protected form(data?:any, formName?:string){

    this.appConfig.canvas.open('form-activity-'+(formName||this.type) , {formItem:data}).pipe(take(1)).subscribe((response:NewActivity)=>{
      
      if(response) {
        
        this.activitiesUpdated.emit(this.updateActivityOnDataGroup(response))
      };
    
    });
  }

  private getList():any { 
    
    let propList:any, types:any, items:any, list:any=[];

    switch (this.type) {

      case 'reserva': {

        propList = ['tours','hotels'];
        types = ['tourActivity','hotelActivity'];

        break;

      }
      case'salida':{

        propList = ['operadores','guiados','chofers','restaurants'];
        types = ['operadorActivity','guiadoActivity','choferActivity','restaurantActivity'];
       
        break; 
      };      
    }



    propList.forEach((label:any,index:any)=>{

      items = this.appConfig.dataConfig.getValue(this.data,label,this.type) || [];

      list = list.concat(items.map((e:any)=>({type:types[index],item:e})));

    });

    return list;

  }

  private updateActivityOnDataGroup(newActivity:NewActivity){

    this.appConfig.dataConfig.setValue(this.data,'add_new_'+newActivity.type,this.type, newActivity.item);

    return this.appConfig.dataConfig.getValue(this.data,'activities',this.type);

  }

  open(item?:any, section?:string){
    console.log(this.getFormUrl(section) ,this.appConfig.canvas.last.outlet);

    if(this.mode=='display') return this.appConfig.canvas.open('display-' +section , {displayItem:item});

    return this.appConfig.canvas.open(this.getFormUrl(section) , {formItem:item}).pipe(take(1)).subscribe((response:NewActivity)=>{
      
      if(response) {
        
        this.activitiesUpdated.emit(this.updateActivityOnDataGroup(response))
      };
    
    });
    
  }

  private getFormUrl(section?:string){

    const outlet = this.appConfig.canvas.last.outlet;

    return 'form-activity-'+(section||this.type)+(outlet=="aside-1" ? '':"-2") 
    
  }

}

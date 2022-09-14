import {  Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { take } from 'rxjs';
import { hotelActivityTable } from 'src/app/fields/hotelActivity';
import { tourActivityTable } from 'src/app/fields/tourActivity';
import { ActivityTypes, NewActivity } from 'src/app/interfaces/activities';
import { TableSection } from 'src/app/interfaces/table';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { TableAdminComponent } from '../../models/table-admin/table-admin.component';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styles: ['']
})
export class ActivitiesListComponent extends TableAdminComponent implements OnChanges{

  @Input() override type!:DataTypes;
  @Input() mode!:string;
  @Input() data!:any;
  @Output() activitiesUpdated = new EventEmitter();

  configs! :{[nameActivity:string]:{order:number, tbConfig:TableSection,instanceProperty:string}};

  constructor(protected override appConfig:AppConfigService) {  super(appConfig); } 

  ngOnChanges(): void {

    this.configs ||= this.getConfig();

    this.init(this.getSectionsWithItems(this.configs),{hideSearchButton:true, sectionsStyle:'small', hidePlusButton:this.mode=='display'})    
  }

  protected override  getData(section:ActivityTypes){

    const instanceProperty = this.configs[section].instanceProperty;

    return this.appConfig.dataConfig.getValue(this.data,instanceProperty ,this.type)
  }

  protected override form(data?:any, formName?:string){

    this.appConfig.canvas.open('form-activity-'+(formName||this.type) , {formItem:data}).pipe(take(1)).subscribe((response:NewActivity)=>{
      
      if(response) {
        
        this.activitiesUpdated.emit(this.updateActivityOnDataGroup(response))
      };
    
    });
  }

  private getSectionsWithItems(sections:any){

    const filtered = Object.values(sections).filter((el:any)=>(this.appConfig.dataConfig.getValue(this.data,el.instanceProperty,this.type)|| []).length)

    return filtered.sort((a:any, b:any)=>a.order-b.order).map((el:any)=>el.tbConfig)

  }

  private getConfig():any { 
    
    switch (this.type) {

      case'reserva': return {

          tourActivity:{order:1, tbConfig:tourActivityTable,instanceProperty:'tours'},
          hotelActivity:{order:2, tbConfig:hotelActivityTable,instanceProperty:'hotels'}

        }
    }
  }

  private updateActivityOnDataGroup(newActivity:NewActivity){

    this.appConfig.dataConfig.getValue(this.data,'add_new_'+newActivity.type,this.type);

    return this.appConfig.dataConfig.getValue(this.data,'activities',this.type);
  }

  open(item:any, section?:string){

    if(this.mode=='display'){

      this.display(item, null, section);

    }else{
      console.log(item, section);
      this.form(item,section);
    }
  }

}

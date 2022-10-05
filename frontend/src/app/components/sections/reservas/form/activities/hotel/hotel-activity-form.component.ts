import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { formAdminTemplate } from 'src/app/components/shared/models/form-admin/template';
import { hotelActivityForm } from 'src/app/fields/hotelActivity';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { FormItem } from 'src/app/interfaces/form';

@Component({
  selector: 'app-hotel-activity-form',
  template: '<div class="m-3">'+formAdminTemplate+"</div>",
  styles: ['']
})
export class HotelActivityFormComponent extends FormAdminComponent implements OnInit {

  reserva:any;

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { 
    
    this.init('hotelActivity', hotelActivityForm); 
    
  }

  override init(type:DataTypes, fields:FormItem[] = []): void {

    let idReserva;

    this.item = this.appConfig.canvas.last.query?.formItem || this.appConfig.dataConfig.getModel(type);

    this.type = type;

    this.fields = fields;

    this.reserva = this.appConfig.canvas.last.query.editData;

    idReserva = this.appConfig.dataConfig.getValue(this.reserva,'id','reserva');

    this.appConfig.dataConfig.setValue(this.item,'reserva',this.type, idReserva)
 
  }

  override save(item:any):any{

    if(!this.is_valid(item)) return this.form_error_message();

    if(this.reservaIsNew()) return this.appConfig.canvas.close(item)
   
    this.appConfig.queries.save(this.type,item).pipe(take(1)).subscribe(response=>{
    
      if(!response || response.errors) {   this.server_error_message() }

      else{        
       
        this.server_success_message().pipe(take(1)).subscribe(e=>this.appConfig.canvas.close(response)) 
      }
      
    });
  }

  private reservaIsNew(){

    return this.appConfig.dataConfig.getValue(this.reserva,'id','reserva') == 'nuevo'
  }


}

import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { salidaForm } from 'src/app/fields/salida';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-salidas-form',
  template: '<div class="m-3"><app-form [fields]="fields" [type]="type" [item]="item" (save)="save($event)" (change)="checkUpdate($event)"></app-form></div>',
  styles: ['']
})
export class SalidasFormComponent extends FormAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init('salida', salidaForm ); }

  checkUpdate(update:{item:any,valid:boolean,changed?:any}){

    const changes:any = update.changed || {};

    if(changes.tour){

      const item = update.item;
      
      const tour = this.appConfig.queries.find('tour',changes.tour),
            time_start = this.appConfig.dataConfig.getValue(tour,'inicio','tour'),
            time_end = this.appConfig.dataConfig.getValue(tour,'fin','tour');

      this.appConfig.dataConfig.setValue(item,'time_start','salida',time_start);
      this.appConfig.dataConfig.setValue(item,'time_end','salida',time_end);

      
      this.item = item;

    }

    if(changes.date_start){

      const item = update.item;

      this.appConfig.dataConfig.setValue(item,'date_end','salida',changes.date_start)   
      
      this.item = item;
    }
    
  }

  override save(item:any):any{

    const allData = {salida:item};

    if(!this.is_valid(item)) return this.form_error_message();
   
    this.appConfig.queries.save(this.type,allData, true).pipe(take(1)).subscribe(response=>{
    
      if(!response || response.errors) {   this.server_error_message() }

      else{        
   
        this.server_success_message().pipe(take(1)).subscribe(e=>this.appConfig.canvas.close(response.item)) 
      }
      
    });
  }


}

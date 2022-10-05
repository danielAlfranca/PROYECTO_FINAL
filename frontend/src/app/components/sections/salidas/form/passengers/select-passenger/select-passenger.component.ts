import { Component, OnInit } from '@angular/core';
import { differenceInDays, isAfter, isBefore } from 'date-fns';
import parse from 'date-fns/parse';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { tourActivityPaxTable } from 'src/app/fields/tourActivity';
import { passengerTable } from 'src/app/fields/passenger';

@Component({
  selector: 'app-select-passenger',
  templateUrl: './select-passenger.component.html',
  styleUrls: ['./select-passenger.component.scss']
})
export class SelectPassengerComponent extends TableAdminComponent implements OnInit {

  protected item:any;

  date_start!:string;
  date_end!:string;
  tourSalida!:number;

  rows!:[];
  
  constructor(protected override appConfig:AppConfigService) { super(appConfig)  } 

  ngOnInit(): void { 

    const service = this.appConfig.dataConfig;

    this.item = this.appConfig.canvas.last.query.formItem;
    this.date_start = service.getValue(this.item,'date_start','salida');
    this.date_end = service.getValue(this.item,'date_end','salida');
    this.tourSalida = service.getValue(this.item,'tour','salida');

    this.init([tourActivityPaxTable, passengerTable]);       

  }

  protected override display(item: any, type: any, section?: string | undefined): void {

    const updated = this.updateSelected(item,type);    

    this.save(updated,type);
  }

  get_modal_path(result:string){

    const index = Number(this.appConfig.canvas.currentOutletsIndex.popUp) + 1;

    return  `modal-${result}-${index}`;
  }

  protected override form(): void {
    
    this.appConfig.canvas.open('new-passenger',{editData:this.item}).pipe(take(1)).subscribe((response)=>{

      if(response) this.appConfig.canvas.close({item:response, type:'passenger'})

    });
  }

   protected override getData(type:DataTypes){

    let passengers:any = [], isSameTour:any, passenger;

    const service = this.appConfig.dataConfig, tours = Object.values(this.appConfig.queries.section(type)||{});

      tours.forEach((activity:any)=>{

        isSameTour = service.getValue(activity,'tour',type)== this.tourSalida;      

        if(isSameTour){ passengers.push(activity) }

      });

      return passengers;
  }


  updateSelected(item:any, type:DataTypes){

    const service = this.appConfig.dataConfig;

    service.setValue(item,'salida',type, service.getValue(this.item,'id','salida'));

    return item;
  }

  save(item:any, type:DataTypes):any{

    this.appConfig.queries.save(type,item).pipe(take(1)).subscribe(response=>{
      
      if(!response || response.errors) {   this.server_error_message() }

      else{        
       
        this.server_success_message().pipe(take(1)).subscribe((e:any)=>this.appConfig.canvas.close({item:response, type:type})) 
      }
      
    });
  }

  server_success_message(){

    return this.appConfig.canvas.open(this.get_modal_path('success'),{message:`El elemento se ha anadido a la salida`, type:'success'});
  }

  server_error_message(){

     return this.appConfig.canvas.open(this.get_modal_path('error'),{message:`Hubo un error en el servidor y no se pudo cambiar`, type:'error'});
  }

  

}



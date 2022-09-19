import { Component, OnInit } from '@angular/core';
import { isAfter, isBefore } from 'date-fns';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { salidasRoutes } from 'src/app/routes/salidas';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-select-passenger',
  templateUrl: './select-passenger.component.html',
  styleUrls: ['./select-passenger.component.scss']
})
export class SelectPassengerComponent extends TableAdminComponent implements OnInit {

  protected override type = 'reserva' as DataTypes;
  protected item:any;
  
  constructor(protected override appConfig:AppConfigService) {  super(appConfig); } 

  ngOnInit(): void { 

    this.item = this.appConfig.canvas.last.query.salida;

   // this.init([salidaTable], {extraButton:{icon:'bi bi-calendar', color:'info'}}); 
  
  }

  createSections(date:string){

    let startIsBefore, endIsAfter , hasTour, startReserva, endReserva, sections = [], tour,associatedSalida;

    const startDate = new Date(this.appConfig.dataConfig.getValue(this.item,'start_date','salida')),
          endDate = new Date(this.appConfig.dataConfig.getValue(this.item,'end_date','salida')),
          tourSalida = this.appConfig.dataConfig.getValue(this.item,'tour_id','salida');

    (this.appConfig.queries.section('reserva')||[]).forEach((reserva:any)=>{

      startReserva = new Date(this.appConfig.dataConfig.getValue(reserva,'start_date','reserva'));
      endReserva = new Date(this.appConfig.dataConfig.getValue(reserva,'end_date','reserva'));

      startIsBefore = isBefore(startReserva, startDate); 
      endIsAfter = isAfter(startReserva, startDate);
      tour = this.getTour(reserva, tourSalida);

      if(startIsBefore && endIsAfter && tour!=-1){

        associatedSalida = this.findAssignedSalida(tour);
        


      }
    
      
      
    });

    return 
  }

  getTour(reserva:any, tourSalida:number){

    const tours = this.appConfig.dataConfig.getValue(reserva,'tours','reserva')||[];

    return tours.find((tour:any)=>{

      return this.appConfig.dataConfig.getValue(tour,'id','tourActivity') == tourSalida;

    });
  }

  findAssignedSalida(tour:any){

    return this.appConfig.dataConfig.getValue(tour,'associated_salida','tourActivity');

  } 
}



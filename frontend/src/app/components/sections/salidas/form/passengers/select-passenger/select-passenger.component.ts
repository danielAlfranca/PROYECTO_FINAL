import { Component, OnInit } from '@angular/core';
import { differenceInDays, isAfter, isBefore } from 'date-fns';
import parse from 'date-fns/parse';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { passengerTable } from 'src/app/fields/passenger';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-select-passenger',
  templateUrl: './select-passenger.component.html',
  styleUrls: ['./select-passenger.component.scss']
})
export class SelectPassengerComponent extends TableAdminComponent implements OnInit {

  protected override type = 'passenger' as DataTypes;
  protected item:any;
  
  constructor(protected override appConfig:AppConfigService) {  super(appConfig); } 

  ngOnInit(): void { 

    this.item = this.appConfig.canvas.last.query.formItem;

    this.init([passengerTable]);   

  }

  protected override display(item: any, data?: any, section?: string | undefined): void {

    this.appConfig.canvas.close(item);
  }

  protected override form(): void {
    
    this.appConfig.canvas.open('new-passenger',{salida:this.item}).pipe(take(1)).subscribe((response)=>{

      if(response) this.display(response);

    });
  }


  protected override getData(section?:DataTypes){

    let startIsBefore, endIsAfter , startReserva, endReserva, passengers:any = [], tour, passenger;

    const service = this.appConfig.dataConfig,
          startDate = parse(service.getValue(this.item,'date_start','salida'),"dd/MM/yy",new Date()),
          endDate = parse(service.getValue(this.item,'date_end','salida'),"dd/MM/yy",new Date()),
          tourSalida = service.getValue(this.item,'tour_id','salida'),
          reservas = Object.values(this.appConfig.queries.section('reserva')||{});

    reservas.forEach((reserva:any)=>{


      startReserva = parse(service.getValue(reserva,'date_start','reserva'),"dd/MM/yy",new Date());
      endReserva = parse(service.getValue(reserva,'date_end','reserva'),"dd/MM/yy",new Date());

      startIsBefore = isBefore(startReserva, startDate) || differenceInDays(startReserva, startDate)==0; 
      endIsAfter = isAfter(endReserva, endDate) || differenceInDays(endReserva, endDate)==0;

      tour = this.getTour(reserva, tourSalida);
      

      if(startIsBefore && endIsAfter && tour){

  
        passenger = this.appConfig.dataConfig.getModel("passenger");

        let id = service.getValue(tour,'id','tourActivity'),
            activity = service.getValue(tour,'activity_index','tourActivity'),
            pax = service.getValue(tour,'salida_pax','tourActivity');
        
        if(!this.has_passenger(id,activity)){

          service.setValue(passenger,"id","passenger",id);
          service.setValue(passenger,"activity","passenger",activity);
          service.setValue(passenger,"passengers","passenger",pax);
  
          passengers.push(passenger);  

        }       
      }     
      
    });

    return passengers;

  }

  getTour(reserva:any, tourSalida:number){

    const tours = this.appConfig.dataConfig.getValue(reserva,'tours','reserva')||[];

    return tours.find((tour:any)=>{

      return this.appConfig.dataConfig.getValue(tour,'tour_id','tourActivity') == tourSalida;

    });
  }

  has_passenger(id:number,activity:number){

    const service = this.appConfig.dataConfig,
          pax = service.getValue(this.item,'pax','salida' ) || [];
    console.log(pax, id, activity);
    return pax.some((e:any)=>{
      
      return ['id','activity'].every((prop:string, index:number)=>service.getValue(e,prop,'passenger' )==[id,activity][index] )
      
    })

  }

  

}



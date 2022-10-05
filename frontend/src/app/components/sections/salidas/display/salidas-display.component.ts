import { Component, OnInit } from '@angular/core';
import { format, parse } from 'date-fns';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-salidas-display',
  templateUrl: './salidas-display.component.html',
  styleUrls: ['./salidas-display.component.scss']
})
export class SalidasDisplayComponent extends DisplayAdminComponent implements OnInit {

  passengers!:any;
  activities:any;

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init('salida'); }

  override updateDisplayData(item: any): void {

    this.dataDisplay = [

      {title:'Tour', value: this.value('tour_name'), icon:'camera'}, 
      {title:'Fecha', value: format(parse(this.value('date_start'), 'yyyy-MM-dd', new Date() ),"dd/MM/yy"), icon:'calendar'}, 
      {title:'Horario', value: this.value('time_start') + ' - ' + this.value('time_end'), icon:'clock'}
            
    ];

    this.passengers = this.value('pax') || [];

    this.activities = {

      operadores:this.getActivity('operadores'),
      guias:this.getActivity('guiados'), 
      chofers:this.getActivity('chofers')

    };

    this.passengers = {

      clientes:this.getActivity('pasajeros_clientes'), 
      noClientes:this.getActivity('pasajeros_no_clientes')
    
    };
    
  }

  
  getActivity(type:string){

    return (this.appConfig.dataConfig.getValue(this.item,type,'salida') || [])

  }

  getPasajeros(type:string){

    return (this.appConfig.dataConfig.getValue(this.item,type,'salida') || [])

  }

 

  override delete(){
    
    const data = {
      salida:this.item, 
      operadores:this.activities.operadores ||[], 
      guias:this.activities.guias||[],
      chofers:this.activities.chofers||[],
      clientes:this.passengers.clientes||[],
      no_clientes:this.passengers.noClientes||[],
    };

    this.appConfig.queries.delete(this.section as DataTypes,data).pipe(take(1)).subscribe(response=>{

      if(response && !response.errors){ this.successDelete(); } else  { this.errorDelete(); }
      
    });
  }





}

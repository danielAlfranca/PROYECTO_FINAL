import { Component, OnInit } from '@angular/core';
import { min, parse, max, format } from 'date-fns';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit{

  public title!:string;
  public icon!:string;

  public dateString = "";

  constructor(private appConfig:AppConfigService) { 

    this.appConfig.canvas.routesChanges.subscribe((e:any)=>{

      const last = this.appConfig.canvas.last;

      if(last.type=='primary') { this.title = last.title; this.icon = last.icon }

    })

    this.appConfig.queries.$dataUpdates.subscribe((data:any)=>setTimeout(()=>this.dateString=this.getString()));
  }

  ngOnInit(): void { this.dateString=this.getString();}

  open(){ this.appConfig.canvas.open('seleccionar-rango-fecha'); }

  getString(){

    const reservas = Object.values(this.appConfig.queries.section('reserva') || {}),
          starts = min(reservas.map(e=>parse(this.appConfig.dataConfig.getValue(e,'date_start','reserva'),'yyyy-mm-dd',new Date()))),
          ends = max(reservas.map(e=>parse(this.appConfig.dataConfig.getValue(e,'date_end','reserva'),'yyyy-mm-dd',new Date())));

    if(!reservas.length) return 'Sin datos para este rango de fechas';

    console.log(starts, ends, reservas.length);

    return 'Datos desde '+ format(starts,'dd-MM-yy') + ' a ' + format(ends,'dd-MM-yy')

  }

}

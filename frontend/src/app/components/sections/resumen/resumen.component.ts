import { Component, OnInit, OnDestroy } from '@angular/core';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';
import { countBy, flatMap, map, partition, sortBy, take } from 'lodash';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit, OnDestroy {

  section = 0;

  data:any ={

    reserva:[],
    salida:[]    
  }

  charts:any ={

    numReservas:0,
    numSalidas:0,
    rankingTours:[],
    rankingHoteles:[],
    rankingGuias:[],
    rankingEmpresas:[],
    rankingPaquetes:[]

  }

  subscription!:Subscription;

  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {

    this.init(0);
    this.subscription =  this.appConfig.queries.$dataUpdates.subscribe(e=>{
      
      this.init(this.section)

    })
  }

  init(section:number){

    this.section = section;
    this.data = {

      reserva: this.getData('reserva'),
      salida: this.getData('salida')

    }

    this.charts = {

      numReservas:this.data.reserva.length,
      numSalidas:this.data.salida.length,
      porcentajeClientesPropios:this.porcentajeClientesDirectos(),
      porcentajeDuracion:this.porcentajeDuracion(),
      porcentajeDestinos:this.porcentajeDestinos(),
      rankingTours:this.rankingTours(),
      rankingHoteles:this.rankingHoteles(),      
      rankingEmpresasProveedorasDeClientes:this.rankingEmpresasProveedorasClientes()
    }
  }

  private rankingTours(){

    const service = this.appConfig.dataConfig, 
          items = countBy(flatMap(this.data.reserva, (e)=>service.getValue(e,'tours', 'reserva')),(e)=>service.getValue(e,'tour_nombre','tourActivity'));

    return this.mapRanking(items,'bar');
  }

  private rankingHoteles(){

    const service = this.appConfig.dataConfig, 
          items = countBy(flatMap(this.data.reserva, (e)=>service.getValue(e,'hotels', 'reserva')),(e)=>service.getValue(e,'hotel_nombre','hotelActivity'));

    return this.mapRanking(items,'bar');
  }

  private porcentajeDestinos(){

    const service = this.appConfig.dataConfig,
          items = countBy(this.data.reserva, (e)=>service.getValue(e,'destino','reserva'));

      return this.mapRanking(items,'bar');   
  }

  private porcentajeDuracion(){

    const service = this.appConfig.dataConfig,
          items = countBy(this.data.reserva, (e)=>service.getValue(e,'duracion','reserva'));

      return this.mapRanking(items,'pie');   
  } 

  private rankingEmpresasProveedorasClientes(){

    const service = this.appConfig.dataConfig,
          items = countBy(this.data.reserva.filter((e:any)=>service.getValue(e,'provider_name','reserva')!='cliente propio'), (e)=>service.getValue(e,'provider_name','reserva'));

      return this.mapRanking(items,'bar');   
  }

  private porcentajeClientesDirectos(){

    const service = this.appConfig.dataConfig,
          items = countBy(this.data.reserva, (e)=>service.getValue(e,'provider_name','reserva')=='cliente propio' ? 'cliente directo':'de otra agencia');

      return this.mapRanking(items,'pie');  
  }

  private getData(type:DataTypes){

    return this.filterByDate(Object.values(this.appConfig.queries.section(type) || {}),type,this.section);
  }

  private filterByDate(arr:any[],dataType:string, comparison:number){

    const service = this.appConfig.dataConfig, filterMethod = this.getFilterMethod(comparison);

    return arr.filter((e:any)=>filterMethod(service.getValue(e,'date_start',dataType)))
  }

  private getFilterMethod(index:number){

    switch (Number(index)) {

      case 0: return (e:string)=>true    
      case 1: return (e:string)=>isThisMonth(new Date(e))   
      case 2: return (e:string)=>isThisWeek(new Date(e))   
      case 3: return (e:string)=>isToday(new Date(e))  
      default: return (e:string)=>true    

    }

  }

  private mapRanking(arr:any, type:any){

    const data = take(map(arr,(e:number,index:string)=>({name:index,num:e})).sort((a:any,b:any)=>a.num-b.num),5);

    switch (type) {

      case 'pie': return this.getPieData(data)
        
      default: return this.getBarData(data)
        
    }

  }

  private getPieData(arr:any[]){

    return {

      labels:map(arr,(e:any)=>e.name),
      datasets:[

        {data:map(arr,(e:any)=>e.num)}
      ]

    }
  }

  private getBarData(arr:any[]){

    return {

      labels:map(arr,(e:any)=>e.name),
      datasets:[{data:map(arr,(e:any)=>e.num), label:''}]
    }
  }

  ngOnDestroy(): void {
      
    this.subscription.unsubscribe()
  }

}

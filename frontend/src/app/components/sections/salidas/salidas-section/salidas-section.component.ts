import { Component, OnInit } from '@angular/core';
import { isAfter, isBefore, isWithinInterval, parse } from 'date-fns';
import { filter } from 'lodash';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { salidaTable } from 'src/app/fields/salida';
import { TableSection } from 'src/app/interfaces/table';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-salidas-section',
  templateUrl: './salidas-section.component.html',
  styleUrls: ['./salidas-section.component.scss']
})
export class SalidasSectionComponent extends TableAdminComponent implements OnInit {

  protected override type = 'salida' as DataTypes;
  
  constructor(protected override appConfig:AppConfigService) {  super(appConfig); } 

  ngOnInit(): void { this.init([salidaTable], {extraButton:{icon:'bi bi-calendar', color:'info'}}); }

  open(mode:string){

    if (mode=='nuevo') {  return this.form();}
      
    this.appConfig.canvas.open('salidas');
  }

  protected override createTable(sections:TableSection[], extraconfig:any = {}){

    const todos = this.getData(), 
          activos = this.getActivos(todos), 
          proximos = this.getProximos(todos), 
          antiguos = this.getAntiguos(todos),
          dataSections:any = [];
    
    let tbConfig;

    [activos,proximos,antiguos].forEach((data:any, i:number) => {
      
      tbConfig = JSON.parse(JSON.stringify(sections[0]))
      tbConfig.data = data;
      tbConfig.title = ['Activos','Proximos', 'Antiguos'][i];
      dataSections.push(tbConfig)

    });

    return {

      ...extraconfig,
      sections:dataSections
    }
  }

  private getActivos(data:any){

    const today = new Date(), service = this.appConfig.dataConfig;     

    return filter(data, (res:any)=> isWithinInterval(today, {

      start: parse(service.getValue(res,'date_start','salida'), 'yyyy-MM-dd', new Date()),
      end: parse(service.getValue(res,'date_end','salida'), 'yyyy-MM-dd', new Date())

    }))
  }

  private getProximos(data:any){

    const today = new Date(), service = this.appConfig.dataConfig;

    return filter(data, (res:any)=>isAfter(parse(service.getValue(res,'date_start','salida'), 'yyyy-MM-dd', new Date()),today))
  }

  private getAntiguos(data:any){

    const today = new Date(), service = this.appConfig.dataConfig;

    return filter(data, (res:any)=>isBefore(parse(service.getValue(res,'date_end','salida'), 'yyyy-MM-dd', new Date()),today))
  }


}
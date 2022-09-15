import { Component, OnInit } from '@angular/core';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { salidaTable } from 'src/app/fields/salida';
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


}
import { Component, OnInit } from '@angular/core';
import { filter } from 'lodash';
import { take } from 'rxjs';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { empresaTable } from 'src/app/fields/empresa';
import { hotelTable } from 'src/app/fields/hotel';
import { tourTable } from 'src/app/fields/tour';
import { trabajadorTable } from 'src/app/fields/trabajador';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-inventario-section',
  templateUrl: './inventario-section.component.html',
  styleUrls: ['./inventario-section.component.scss']
})
export class InventarioSectionComponent extends TableAdminComponent implements OnInit {
  
  constructor(protected override appConfig:AppConfigService) {  super(appConfig); } 

   ngOnInit(): void { this.init([empresaTable,trabajadorTable,tourTable,hotelTable]); }

  protected override form(){

    this.appConfig.canvas.open('form-inventario').pipe(take(1)).subscribe(response=>{
      
      if(response) this.display(response.item, null, response.type)
    
    });
  } 
  
  protected override getData(section?:DataTypes){

    return filter(this.appConfig.queries.section(section || this.type),(e:any)=>{
      
      return  !Boolean(Number(this.appConfig.dataConfig.getValue(e,'hidden',section|| this.type)));
         
    }); 
  }


}

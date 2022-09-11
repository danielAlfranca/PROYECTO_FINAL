import { Component, Input, OnInit } from '@angular/core';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { hotelActivityTable } from 'src/app/fields/hotelActivity';
import { tourActivityTable } from 'src/app/fields/tourActivity';
import { TableSection } from 'src/app/interfaces/table';
import { AppConfigService } from 'src/app/services/app-config.service';


@Component({
  selector: 'app-reserva-services-table',
  templateUrl: './reserva-services-table.component.html',
  styleUrls: ['./reserva-services-table.component.scss']
})
export class ReservaServicesTableComponent extends TableAdminComponent implements OnInit {

  @Input() data:any;

  constructor(protected override appConfig:AppConfigService) {  super(appConfig); } 


  ngOnInit(): void { this.init([tourActivityTable])}

  protected override init(sections:TableSection[], extraConfig={}){

    sections = this.getSectionsWithItems([tourActivityTable, hotelActivityTable]);

    super.init(sections,{hideSearchButton:true, sectionsStyle:'small'});

  }

  protected override  getData(section:"tourActivity" | "hotelActivity" | "trasladoActivity"){

    const label = {

      tourActivity:'tours',
      hotelActivity:'hotels',
      trasladoActivity:'traslados'

    }[section];

    return this.appConfig.dataConfig.getValue(this.data,label ,'reserva')
  }

  private getSectionsWithItems(sections:any[]){

    return sections.filter((e,i)=>(this.appConfig.dataConfig.getValue(this.data,['tours','hotels','traslados'][i],'reserva')|| []).length)

  }

  

}

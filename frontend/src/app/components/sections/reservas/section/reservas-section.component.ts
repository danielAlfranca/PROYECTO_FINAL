import { Component, OnInit } from '@angular/core';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { reservaTable } from 'src/app/fields/reserva';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-reservas-section',
  templateUrl: './reservas-section.component.html',
  styleUrls: ['./reservas-section.component.scss']
})
export class ReservasSectionComponent extends TableAdminComponent implements OnInit {

  protected override type = 'reserva' as DataTypes;
  
  constructor(protected override appConfig:AppConfigService) {  super(appConfig); } 

  ngOnInit(): void { this.init([reservaTable]); }

}

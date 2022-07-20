import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-inventario-section',
  templateUrl: './inventario-section.component.html',
  styleUrls: ['./inventario-section.component.scss']
})
export class InventarioSectionComponent extends SectionComponent implements OnInit {

  protected override section = 'inventario' as DataTypes;
  
  constructor(protected override appConfig:AppConfigService) { super(appConfig)} 

   ngOnInit(): void {}

    


}

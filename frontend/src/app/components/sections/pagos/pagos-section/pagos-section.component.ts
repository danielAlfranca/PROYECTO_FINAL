import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-pagos-section',
  templateUrl: './pagos-section.component.html',
  styleUrls: ['./pagos-section.component.scss']
})
export class PagosSectionComponent extends SectionComponent implements OnInit {

  protected override section = 'pago' as DataTypes;
  
  constructor(protected override appConfig:AppConfigService) { super(appConfig)} 

   ngOnInit(): void {

    
  }

}

import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';

@Component({
  selector: 'app-pagos-section',
  templateUrl: './pagos-section.component.html',
  styleUrls: ['./pagos-section.component.scss']
})
export class PagosSectionComponent extends SectionComponent implements OnInit {

  constructor() { super()}

  override ngOnInit(): void {

    
  }

}

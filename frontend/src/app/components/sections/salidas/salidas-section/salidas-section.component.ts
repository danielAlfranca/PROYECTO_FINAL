import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';

@Component({
  selector: 'app-salidas-section',
  templateUrl: './salidas-section.component.html',
  styleUrls: ['./salidas-section.component.scss']
})
export class SalidasSectionComponent extends SectionComponent implements OnInit {

  constructor() { super()}

  override ngOnInit(): void {

    
  }

}

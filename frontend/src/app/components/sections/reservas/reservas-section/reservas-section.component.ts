import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';

@Component({
  selector: 'app-reservas-section',
  templateUrl: './reservas-section.component.html',
  styleUrls: ['./reservas-section.component.scss']
})
export class ReservasSectionComponent extends SectionComponent implements OnInit {

  constructor() { super()}

  override ngOnInit(): void {

    
  }

}

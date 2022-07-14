import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';

@Component({
  selector: 'app-inventario-section',
  templateUrl: './inventario-section.component.html',
  styleUrls: ['./inventario-section.component.scss']
})
export class InventarioSectionComponent extends SectionComponent implements OnInit {

  constructor() { super()}

  override ngOnInit(): void {

    
  }

}

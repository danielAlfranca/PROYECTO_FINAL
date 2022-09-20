import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CustomFieldComponent } from '../../model/custom-field.component';

@Component({
  selector: 'app-pax-list-form-admin',
  template: `
    <app-pax-list
      mode="edit" 
      [passengers]="value" 
      [salida]="item" 
      (paxUpdated)="onChange($event)">    
    </app-pax-list>`,
  styleUrls: ['./pax-list-form-admin.component.scss']
})
export class PaxListFormAdminComponent extends CustomFieldComponent implements OnInit{

  @Input() item:any;

  constructor() {super() }

  ngOnInit(): void {
      console.log('pasajeros', this.value);
  }

  

}

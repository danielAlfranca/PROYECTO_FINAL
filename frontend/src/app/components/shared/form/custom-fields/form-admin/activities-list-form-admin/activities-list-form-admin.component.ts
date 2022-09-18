import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CustomFieldComponent } from '../../model/custom-field.component';

@Component({
  selector: 'app-activities-list-form-admin',
  template: `
    <app-activities-list 
      [type]="type" 
      [data]="activitiesGroupItem" 
      (paxUpdated)="onChange($event)">    
    </app-activities-list>`,

  styles: ['']
})
export class ActivitiesListFormAdminComponent extends CustomFieldComponent implements OnChanges {

  @Input() activitiesGroupItem:any
  @Input() type:any

  constructor() {super() }

  ngOnChanges(changes: SimpleChanges): void { this.activitiesGroupItem = [...this.activitiesGroupItem] }

}

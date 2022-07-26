import { Component, OnInit } from '@angular/core';
import { CustomFieldComponent } from '../model/custom-field.component';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent extends CustomFieldComponent  {

  constructor() { super(); }


}

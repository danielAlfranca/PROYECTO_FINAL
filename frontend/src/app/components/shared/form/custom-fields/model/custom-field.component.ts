import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-field',
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.scss']
})
export class CustomFieldComponent {

  @Input() name!:string; 
  @Input() title!:string;
  @Input() value!:any;
  @Input() options!:any;
  @Input() control:any;

  @Output() inputChange = new EventEmitter()

  constructor() { }

  onChange(value:any){ this.inputChange.emit(value) }

}

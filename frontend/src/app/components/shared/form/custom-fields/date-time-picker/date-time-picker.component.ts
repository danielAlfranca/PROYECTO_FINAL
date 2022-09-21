import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CustomFieldComponent } from '../model/custom-field.component';

declare var Datepicker:any;


@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent extends CustomFieldComponent implements OnChanges {

  @Output() timeChange = new EventEmitter<string>();
  @Input() time!:string;
  @Input() timeHidden?:boolean;
  @Input() dateHidden?:boolean;

  date_time_string = '';
  calendarOpen = false;
  timeOpen = false;


  constructor() { super(); }  

  ngOnChanges(changes: SimpleChanges): void { this.update(); }

  changeDate(date?:string){

    this.value = date||'';
    
    this.onChange(date);

    this.update()

  }

  changeTime(time?:string){

    this.time = time ||'';    

    this.timeChange.emit(time);

    this.update();

  }

  update(){

    this.date_time_string = this.create_date_time_string()
  }

  create_date_time_string(){

    const date  = this.value , time = this.time;

    if(this.dateHidden) return time

    if(this.timeHidden) return date

    return [date, time ].filter(e=>e).join(' - ')

  }
}

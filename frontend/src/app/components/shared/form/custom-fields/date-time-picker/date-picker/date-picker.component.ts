import { Component, AfterViewInit, Output, Input, EventEmitter} from '@angular/core';

declare var Datepicker:any;

@Component({
  selector: 'app-date-picker',
  template: '<div [id]="idCalendar" [attr.data-date]="date"></div>',
  styles: ['']
})
export class DatePickerComponent implements AfterViewInit {

  @Input() date!:string;
  @Output() newDate = new EventEmitter();

  idCalendar:string
  
  constructor() {

    this.idCalendar ='cal'+Math.floor( (Math.random() + Math.random())*1000000);

   }

  ngAfterViewInit(): void {
      
    setTimeout(()=>{

      const elem = document.querySelector('#'+this.idCalendar) as Element;
      const datepicker = new Datepicker(elem);

      elem.addEventListener('changeDate', (e:any)=>this.newDate.emit(Datepicker.formatDate(e.detail.date, 'dd/mm/yy')));     

    })
  }

}

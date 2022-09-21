import { Component, AfterViewInit, Output, Input, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { format, parse } from 'date-fns';

declare var Datepicker:any;

@Component({
  selector: 'app-date-picker',
  template: '<div [id]="idCalendar" [attr.data-date]="formattedDate"></div>',
  styles: ['']
})
export class DatePickerComponent implements AfterViewInit, OnChanges {

  @Input() date!:string;
  @Output() newDate = new EventEmitter();

  idCalendar:string
  formattedDate!:any


  ngOnChanges(changes: SimpleChanges) { 

    if(changes['date']){


    }
  }
  
  constructor() {

    this.idCalendar ='cal'+Math.floor( (Math.random() + Math.random())*1000000);

   }

  ngAfterViewInit(): void {
      
    setTimeout(()=>{

      const elem = document.querySelector('#'+this.idCalendar) as Element;
      const datepicker = new Datepicker(elem);

      elem.addEventListener('changeDate', (e:any)=>{
        
        let date =Datepicker.formatDate(e.detail.date, 'yyyy-mm-dd');

        console.log(date,(e.detail.date))

        this.newDate.emit(date)
      
      });     

    })
  }

}


import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styles: ['']
})
export class TimePickerComponent implements OnChanges, OnInit {

  @Output() newTime = new EventEmitter();
  @Input() time!:string;

  constructor() { }

  hours!:string
  minutes!:string

  hoursList!:string[]
  minutesList!:string[]

  ngOnInit(): void { 
    
    this.createLists(); 
    this.hours = this.getHours();
    this.minutes = this.getMinutes();
    console.log(this.hours, this.minutes, this.time)
  
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.hours = this.getHours();
    this.minutes = this.getMinutes();


      
  }

  save(){

    if(this.hours && this.minutes) {

      this.newTime.emit(this.hours+':'+this.minutes)
    }
  }

  reset(){

    this.newTime.emit('')
  }

  getHours(){

    if(!this.time) return ''

    return (this.time.split(':')[0] || '').trim()

  }

  getMinutes(){
 
    if(!this.time) return ''

    return (this.time.split(':')[1] || '').trim()
  }

  createLists(){

    const de0A9 = new Array(10).fill('0').map((num,i)=>''+num+i),
          de10A23 = new Array(14).fill(10).map((num,i)=>(num+i)+''),
          de10A59 = new Array(50).fill(10).map((num,i)=>(num+i)+'');

    this.hoursList = de0A9.concat(de10A23);
    this.minutesList = de0A9.concat(de10A59);

  }



}

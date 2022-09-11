import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { DataItemDisplayComponent } from './data-item-display/data-item-display.component';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent  {

  @Input() title!:string;
  @Input() data!:{title:string, value:string, icon:string}[];
  @Input() editButton?:true;
  @Input() addButton?:true;

  @Output() edit = new EventEmitter<true>()



  constructor() { }

  ngAfterViewInit() {
    
    setTimeout(()=>{


    })
  }
  
}

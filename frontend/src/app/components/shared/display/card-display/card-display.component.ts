import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent implements OnInit {

  @Input() title!:string;
  @Input() data!:{title:string, value:string, icon:string}[];
  @Input() editButton?:true;
  @Input() addButton?:true;

  @Output() edit = new EventEmitter<true>()

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs-header',
  templateUrl: './tabs-header.component.html',
  styleUrls: ['./tabs-header.component.scss']
})
export class TabsHeaderComponent implements OnInit {

  @Input() titles!:string[];
  @Input() selected!:number;
  @Output() selectedChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {

    this.selected |= 0;
  }

  change(newIndex:number): void { 

    this.selectedChange.emit(newIndex)
    this.selected = newIndex;
  }

}

import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {

  @Input() title!:string
  @Input() sections!:string[]
  @Input() hidePlusButton!:string
  @Input() hideSearchButton!:string[]
  @Input() extraButton!:{icon:string, color:string}


  constructor() { }

  ngOnInit(): void {
  }

}

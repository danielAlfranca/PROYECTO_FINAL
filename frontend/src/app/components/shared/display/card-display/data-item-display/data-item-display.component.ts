import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-data-item-display]',
  templateUrl: './data-item-display.component.html',
  styleUrls: ['./data-item-display.component.scss'],
  host: {'class': 'list-group-item d-flex justify-content-between align-items-center border-0 mb-2'}
})
export class DataItemDisplayComponent implements OnInit {

  @Input() icon!:string;
  @Input() title!:string;

  constructor() { }

  ngOnInit(): void {}

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-header',
  templateUrl: './tabs-header.component.html',
  styleUrls: ['./tabs-header.component.scss']
})
export class TabsHeaderComponent implements OnInit {

  @Input() titles!:string[];

  constructor() { }

  ngOnInit(): void {
  }

}

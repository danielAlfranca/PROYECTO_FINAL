import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TableConfig } from 'src/app/interfaces/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {

  @Input() config!:TableConfig
  @Input() data!:any[];

  pages!:number[];

  currentSection:number = 0;
  currentPage:number = 1;
  searchTerm:string = '';

  private list!:any[]; // filtered data
  

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
      
  }

  changePage(page:number){


  }

  private filter(){}

  private pagination(data:any[]){

    const numOfPages = Math.ceil(this.data.length/15);
    this.pages = new Array(numOfPages).fill(1).map((e,index)=>index+1); 

  }



}

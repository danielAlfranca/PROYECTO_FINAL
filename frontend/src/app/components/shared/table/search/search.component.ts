import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TableConfig } from 'src/app/interfaces/table';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() data!:any[];
  @Input() dataType!:string;
  @Input() searchProperties!:string[] 

  @Output() filtered =  new EventEmitter<any[]>();

  @ViewChild('input') input!: ElementRef<HTMLElement>;

  active= false;

  constructor(private appConfig:AppConfigService) { }

  private filter(term:string){

    let concatenated:string, dataConfig = this.appConfig.dataConfig;

    return this.data.filter(item=>{

      concatenated = this.searchProperties.map(property=> dataConfig.getValue(item,property, this.dataType) ).join(' ')

      return concatenated.toLowerCase().indexOf(term)!=-1

    })
  }

  update(eventInput:any){

    const term = eventInput.target.value;

    this.filtered.emit(term.length>2 ? this.filter(term) :this.data)

  }

  change(){

    this.active=!this.active;

    if(this.active){ this.input.nativeElement.focus() }
  }

 

}

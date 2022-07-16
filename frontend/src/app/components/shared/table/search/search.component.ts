import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { TableConfig } from 'src/app/interfaces/table';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() data!:any[];
  @Input() config!:TableConfig  
  @Output() filtered =  new EventEmitter<any[]>();

  active= false;

  constructor(private appConfig:AppConfigService) { }

  private filter(term:string){

    let concatenated, 
        list = this.config.search, 
        dataType = this.config.dataType,
        dataConfig = this.appConfig.dataConfig;

    return this.data.filter(item=>{

      concatenated = list.map(property=> dataConfig.getValue(item,property, dataType) ).join(' ')

      return concatenated.indexOf(term)!=-1

    })
  }

  update(term:string){

    if(term.length>2) this.filtered.emit(this.filter(term))

  }

 

}

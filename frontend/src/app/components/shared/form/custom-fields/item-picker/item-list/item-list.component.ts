import { AfterViewInit, Component,  QueryList, TemplateRef } from '@angular/core';
import { TableConfig } from 'src/app/interfaces/table';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements AfterViewInit {

  type!:DataTypes;
  selected!:number|string;

  options!:QueryList<TemplateRef<any>>;
  template!:TemplateRef<any>

  constructor(protected appConfig:AppConfigService) { }

  ngAfterViewInit(): void {
    
    setTimeout(()=>{ this.init(); })
  }

  init(){

    const data = this.appConfig.canvas.last.query;
    this.type = data.type;
    this.template = this.pickTable(this.type);

  }

  pickTable(type:DataTypes){

    const templates = this.options.toArray() || [],
          options = ['empresa','trabajador','hotel','tour'];


    return templates[options.findIndex(e=>type)]
  }






}

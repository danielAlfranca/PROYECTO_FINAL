import { AfterViewInit, Component,  QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styles: ['']
})
export class ItemListComponent implements AfterViewInit {

  type!:DataTypes;
  selected!:number|string;

  @ViewChildren(TemplateRef)  options!:QueryList<TemplateRef<any>>;
  template!:TemplateRef<any>

  constructor(protected appConfig:AppConfigService) { }

  ngAfterViewInit(): void {
    
    setTimeout(()=>{ this.init(); })
  }

  init(){

    const data = this.appConfig.canvas.last.query;
    this.type = data.type;
    this.template = this.pickTemplate(this.type);

  }

  pickTemplate(type:DataTypes){

    const templates = this.options.toArray() || [],
          options = ['empresa','trabajador','hotel','tour'];

    return templates[options.findIndex(e=>type)]
  }






}

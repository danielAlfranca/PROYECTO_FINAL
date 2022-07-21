import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-admin',
  template: '',
  styles: ['']
})
export class DisplayAdminComponent  {

  item:any;
  section!:string;
  editPath!:string;
  dataDisplay:any;
  
  constructor(protected appConfig:AppConfigService) { }

  init(section:string, editPath?:string){

    this.section = section;
    this.editPath = editPath || 'editar-'+this.section;

    this.item = this.appConfig.canvas.last.query.displayItem;
  }

  edit(){

    this.appConfig.canvas.open(this.editPath, {editItem:this.item});
  }

  delete(){

    this.appConfig.queries.delete(this.section,this.item);
  }

  value(prop:string){

    return this.appConfig.dataConfig.getValue(this.item,prop,this.section);
  }


}

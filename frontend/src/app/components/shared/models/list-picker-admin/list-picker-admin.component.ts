import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TableConfig, TableSection } from 'src/app/interfaces/table';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-list-picker-admin',
  templateUrl: './list-picker-admin.component.html',
  styleUrls: ['./list-picker-admin.component.scss']
})
export class ListPickerAdminComponent {

  type!:DataTypes;
  path!:string;
  selected!:number|string;

  tableConfig!:TableConfig

  constructor(protected appConfig:AppConfigService) { }

  init(){

    const data = this.appConfig.canvas.last.query;

    this.type = data.type;
    this.path = 'form-item';
    this.selected = data.selected;
    
  }

  form(){

    this.appConfig.canvas.open('form-item', {type:this.type}).pipe(take(1)).subscribe((response)=>{

      if(response) this.pick(response);

    })
  }

  pick(item:any){

      this.appConfig.canvas.close(this.parseResponse(item))
  }

  parseResponse(response:any){

    return this.appConfig.dataConfig.getValue(response,'id',this.type);
  }

  protected createTable(section:TableSection){

    section.data = this.appConfig.queries.section(this.type);  
  
    return {sections:section}
  }

  

}

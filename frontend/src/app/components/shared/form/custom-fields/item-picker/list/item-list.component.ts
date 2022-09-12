import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { empresaTable } from 'src/app/fields/empresa';
import { tourTable } from 'src/app/fields/tour';
import { TableSection } from 'src/app/interfaces/table';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styles: ['']
})
export class ItemListComponent extends TableAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig)}

  ngOnInit(): void {
      
    this.init([])
  }

  protected override init(sections:TableSection[], extraconfig:any = {}){

    const data = this.appConfig.canvas.last.query;
    this.type = data.type;

    super.init([this.getConfig(this.type)])
  }

  protected override display(item: any, data?: any, section?: string | undefined): void {

    this.appConfig.canvas.close(item);
  }

  protected override form(): void {
    
    this.appConfig.canvas.open('pop-up-form',{type:this.type}).pipe(take(1)).subscribe((response)=>{

      if(response) this.display(response);

    });
  }

  getConfig(type:DataTypes): TableSection{


    switch (type) {
      case 'empresa':return empresaTable;
      case 'tour':return tourTable;
      default: return empresaTable; 
    }

   

  }

  






}

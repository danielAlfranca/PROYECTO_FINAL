import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { empresaTable2 } from 'src/app/fields/empresa';
import { hotelTable } from 'src/app/fields/hotel';
import { tourTable } from 'src/app/fields/tour';
import { trabajadorTable } from 'src/app/fields/trabajador';
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

    const id = this.appConfig.dataConfig.getValue(item, 'id',this.type);
    this.appConfig.canvas.close(id);
  }

  protected override form(): void {
    
    this.appConfig.canvas.open(this.get_modal_path(),{type:this.type}).pipe(take(1)).subscribe((response)=>{

      if(response) this.display(response);

    });
  }

  getConfig(type:DataTypes): TableSection{

    switch (type) {

      case 'empresa':return empresaTable2;
      case 'tour':return tourTable;
      case 'hotel':return hotelTable;
      case 'trabajador':return trabajadorTable;
      default: return empresaTable2; 

    }   

  }

  get_modal_path(){

    const index = Number(this.appConfig.canvas.currentOutletsIndex.popUp) + 1;

    return  `pop-up-form-${index}`;
  }
}

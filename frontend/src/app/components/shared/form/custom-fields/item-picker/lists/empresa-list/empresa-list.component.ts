import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { empresaTable } from 'src/app/fields/empresa';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent extends TableAdminComponent implements OnInit {

  protected override type: DataTypes = 'empresa'; 
  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init([empresaTable]);  }

  protected override display(item: any, data?: any, section?: string | undefined): void {

    this.appConfig.canvas.close(item);
  }

  protected override form(): void {
    
    this.appConfig.canvas.open('form-item',{}).pipe(take(1)).subscribe((response)=>{

      if(response) this.display(response);

    });
  }


}

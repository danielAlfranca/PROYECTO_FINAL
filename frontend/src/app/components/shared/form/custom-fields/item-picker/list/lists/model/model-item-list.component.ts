import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TableAdminComponent } from 'src/app/components/shared/models/table-admin/table-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-model-item-list',
  template: '',
  styles: ['']
})
export class ModelItemListComponent extends TableAdminComponent {

 constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  protected override display(item: any, data?: any, section?: string | undefined): void {

    this.appConfig.canvas.close(item);
  }

  protected override form(): void {
    
    this.appConfig.canvas.open('pop-up-form',{type:this.type}).pipe(take(1)).subscribe((response)=>{

      if(response) this.display(response);

    });
  }

}

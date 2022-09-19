import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { formAdminTemplate } from 'src/app/components/shared/models/form-admin/template';
import { operatorActivityForm } from 'src/app/fields/operadorActivity';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-operador-form',
  template: '<div class="m-3">'+formAdminTemplate+"</div>",
  styles: ['']
})
export class OperadorFormComponent extends FormAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init('operadorActivity', operatorActivityForm); }

}

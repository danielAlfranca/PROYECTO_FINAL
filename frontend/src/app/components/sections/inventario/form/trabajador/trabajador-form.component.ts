import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { formAdminTemplate } from 'src/app/components/shared/models/form-admin/template';
import { trabajadorForm } from 'src/app/fields/trabajador';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-trabajador-form',
  template: formAdminTemplate,
  styles: ['']
})
export class TrabajadorFormComponent extends FormAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init('trabajador', trabajadorForm); }

}


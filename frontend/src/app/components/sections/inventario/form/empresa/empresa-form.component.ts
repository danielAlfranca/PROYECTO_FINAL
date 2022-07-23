import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { FormItem } from 'src/app/interfaces/form';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss']
})
export class EmpresaFormComponent extends FormAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void {

    this.init('empresa');
    this.fields = [

      {
        title:'Nombre',
        name:'nombre',
        input:'text'
      },
      {
        title:'Documento',
        name:'documento',
        input:'text'
      },
      {
        title:'Direccion',
        name:'direccion',
        input:'text'
      },
      {
        title:'Telefonos',
        name:'telefonos',
        input:'text'
      },
      {
        title:'Emails',
        name:'telefonos',
        input:'text'
      }

    ] as FormItem[];
  }

}

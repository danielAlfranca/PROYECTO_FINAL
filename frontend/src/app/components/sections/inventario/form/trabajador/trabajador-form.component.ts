import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { FormItem } from 'src/app/interfaces/form';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-trabajador-form',
  templateUrl: './trabajador-form.component.html',
  styleUrls: ['./trabajador-form.component.scss']
})
export class TrabajadorFormComponent extends FormAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void {

    this.init('trabajador');
    this.fields = [

      {
        title:'Nombre',
        name:'nombre',
        input:'text'
      },
      {
        title:'documento',
        name:'documento',
        input:'text',
      },
      {
        title:'tipo',
        name:'tipo',
        input:'select',
        options:[{name:'guia'},{name:'chofer'},{name:'administrativo'}],
      },
      {
        title:'regimen',
        name:'regimen',
        input:'select',
        options:[{name:'en plantilla'},{name:'autonomo'}],
      },
      {
        title:'telefonos',
        name:'telefonos',
        input:'text'
      },
      {
        title:'emails',
        name:'emails',
        input:'text'
      }
      

    ] as FormItem[];
  }

}


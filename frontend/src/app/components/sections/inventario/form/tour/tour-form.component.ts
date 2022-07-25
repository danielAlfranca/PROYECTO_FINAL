import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { FormItem } from 'src/app/interfaces/form';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.scss']
})
export class TourFormComponent extends FormAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void {

    this.init('tour');
    this.fields = [

      {
        title:'Nombre',
        name:'nombre',
        input:'text'
      },
      {
        title:'inicio',
        name:'inicio',
        input:'time',
        columns:6,
      },
      {
        title:'fin',
        name:'fin',
        input:'time',
        columns:6,
      },
      {
        title:'duracion',
        name:'duracion',
        input:'number'
      },
      {
        title:'destino',
        name:'destino',
        input:'text'
      }
      

    ] as FormItem[];
  }

}

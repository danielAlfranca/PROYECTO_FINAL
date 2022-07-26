import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { FormItem } from 'src/app/interfaces/form';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss']
})
export class HotelFormComponent extends FormAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void {

    this.init('hotel');
    this.fields = [

      {
        title:'Nombre',
        name:'nombre',
        input:'text'
      },
      {
        title:'Tipo',
        name:'tipo',
        input:'select',
        options:[{name:'hotel'},{name:'lodge'},{name:'alojamiento'}]
      },
      {
        title:'Direccion',
        name:'direccion',
        input:'text'
      },
      {
        title:'Telefonos',
        name:'telefonos',
        input:'array'
      },
      {
        title:'Emails',
        name:'telefonos',
        input:'array'
      },
      {
        title:'Propietario',
        name:'propietario',
        input:'itemPicker',
        options:{type:'empresa'}
      }

    ] as FormItem[];
  }

}

import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { formAdminTemplate } from 'src/app/components/shared/models/form-admin/template';
import { hotelForm } from 'src/app/fields/hotel';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-hotel-form',
  template: formAdminTemplate,
  styles: ['']
})
export class HotelFormComponent extends FormAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init('hotel', hotelForm); }


}

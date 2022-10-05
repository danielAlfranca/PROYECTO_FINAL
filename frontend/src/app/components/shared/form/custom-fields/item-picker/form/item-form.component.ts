import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { formAdminTemplate } from 'src/app/components/shared/models/form-admin/template';
import { empresaForm } from 'src/app/fields/empresa';
import { hotelForm } from 'src/app/fields/hotel';
import { tourForm, tourFormPopUp } from 'src/app/fields/tour';
import { trabajadorForm } from 'src/app/fields/trabajador';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-item-form',
  template: formAdminTemplate,
  styles: ['']
})
export class ItemFormComponent  extends FormAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void {

    const type = this.appConfig.canvas.last.query.type,
          formFields = this.pickFields(type);

    this.init(type, formFields);   
  }

  pickFields(type:string){

    return {

      empresa: empresaForm,
      hotel: hotelForm,
      tour: tourFormPopUp,
      trabajador: trabajadorForm   

    }[type];
  }

}


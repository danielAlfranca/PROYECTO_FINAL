import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { reservaForm,reservaForm2 } from 'src/app/fields/reserva';
import { FormItem } from 'src/app/interfaces/form';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss']
})
export class ReservaFormComponent extends FormAdminComponent implements OnInit {

  fields2!:FormItem[]; // for stepform
  initialStep?:number;

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init('reserva', reservaForm); }

 override init(type:DataTypes, fields:FormItem[] ): void {

    const formData = this.item = this.appConfig.canvas.last.query;
    this.fields = fields;
    this.fields2 = reservaForm2;
    this.item = formData?.formItem || this.appConfig.dataConfig.getModel(type)
    this.initialStep = formData?.editData 
    this.type = type;   

  }

}

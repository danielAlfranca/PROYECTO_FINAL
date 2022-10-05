import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { formAdminTemplate } from 'src/app/components/shared/models/form-admin/template';
import { passengerForm } from 'src/app/fields/passenger';
import { FormItem } from 'src/app/interfaces/form';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-create-passenger',
  template: '<div class="m-3">'+formAdminTemplate+"</div>",
  styleUrls: ['./create-passenger.component.scss']
})
export class CreatePassengerComponent extends FormAdminComponent implements OnInit{

  salida!:any;
  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void {

    this.init('passenger', passengerForm); 

  }

  override init(type:DataTypes, fields:FormItem[] = []): void {

    let idSalida;

    this.item = this.appConfig.canvas.last.query?.formItem || this.appConfig.dataConfig.getModel(type);

    this.type = type;

    this.fields = fields;

    this.salida = this.appConfig.canvas.last.query.editData;

    idSalida = this.appConfig.dataConfig.getValue(this.salida,'id','salida');

    this.appConfig.dataConfig.setValue(this.item,'salida',this.type, idSalida);
 }


}

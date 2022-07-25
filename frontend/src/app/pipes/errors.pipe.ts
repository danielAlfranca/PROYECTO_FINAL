import { Pipe, PipeTransform } from '@angular/core';
import { DataTypes } from '../interfaces/types/data-config';
import { AppConfigService } from '../services/app-config.service';

@Pipe({
  name: 'errors'
})
export class ErrorsPipe implements PipeTransform {

  constructor(private appConfig: AppConfigService) { }

  transform(item: any, type: DataTypes, field: string): any {



      const errors = Object.keys(this.appConfig.dataConfig.getValidations(item, field, type));

      console.log(this.appConfig.dataConfig.getValue(item,field,type))

      if (errors.includes('required')) return 'Este campo es requerido';
      else if (errors.length) return 'Este campo contiene errores';
      return ''


  }

}

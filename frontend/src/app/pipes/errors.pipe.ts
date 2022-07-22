import { Pipe, PipeTransform } from '@angular/core';
import { DataTypes } from '../interfaces/types/data-config';
import { AppConfigService } from '../services/app-config.service';

@Pipe({
  name: 'errors'
})
export class ErrorsPipe implements PipeTransform {

  constructor(private appConfig:AppConfigService){}

  transform(item: any, type:DataTypes, field:string): unknown {

    return Object.keys(this.appConfig.dataConfig.getValidations(item,field, type)).join(', ')
  }

}

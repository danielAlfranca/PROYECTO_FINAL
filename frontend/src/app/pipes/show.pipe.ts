import { Pipe, PipeTransform } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';
import { DataConfigService } from '../services/data-config/data-config.service';

@Pipe({
  name: 'show'
})
export class ShowPipe implements PipeTransform {

  private dataConfig:DataConfigService;

  constructor(private appConfig:AppConfigService){

    this.dataConfig = this.appConfig.dataConfig;
  }


  transform(value: unknown, dataType:string, property:string): unknown {

    return null;
  }

}

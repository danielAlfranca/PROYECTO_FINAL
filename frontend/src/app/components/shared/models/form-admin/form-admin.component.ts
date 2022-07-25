import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormItem } from 'src/app/interfaces/form';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.scss']
})
export class FormAdminComponent {

  item!:any;
  type!:DataTypes;
  fields!:FormItem[];

  touched = false;  

  constructor(protected appConfig:AppConfigService) { }

  init(type:DataTypes): void {

    this.item = this.appConfig.canvas.last.query.formItem;
    this.type = type;
  }

  save(item:any){

    this.appConfig.queries.save(this.type,item).pipe(take(1)).subscribe(response=>{
      console.log(response);
      if(response) {alert('Salvado con exito'); this.appConfig.canvas.close(response)}
      else (alert('hubo un error'))

      
    });
  }

  close(){

    this.appConfig.canvas.close(this.item)
  }

}

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

  // PATHS PARA MODAL
  
  form_error_path!:string;
  save_success_path!:string;
  update_success_path!:string;
  save_error_path!:string;

  constructor(protected appConfig:AppConfigService) { }

  init(type:DataTypes): void {

    const data = this.appConfig.canvas.last.data || {};

 

    this.item = this.appConfig.canvas.last.query?.formItem || this.appConfig.dataConfig.getModel(type);

    this.type = type;

    this.form_error_path = data.form_error_path || 'form-error';
    this.save_success_path = data.save_success_path || 'save-success';
    this.update_success_path = data.save_success_path ||  'update-success';
    this.save_error_path = data.save_error_path ||  'save-error';

    console.log(this.form_error_path ,  this.save_success_path , this.update_success_path ,  this.save_error_path)
  }

  save(item:any):any{


    if(!this.is_valid(item)) return this.form_error_message();

   
    this.appConfig.queries.save(this.type,item).pipe(take(1)).subscribe(response=>{

      if(response) {
        
        this.server_success_message().pipe(take(1)).subscribe(e=>this.appConfig.canvas.close(response))      
      }
      else (this.server_error_message())
      
    });
  }

  close(item:any){

    this.appConfig.canvas.close(item)
  }

  is_valid(item:any){

    return this.appConfig.dataConfig.validate(this.item,this.type);
  }

  form_error_message(){

    return this.appConfig.canvas.open(this.form_error_path);
  }

  server_success_message(){

    const path = this.is_new_element() ? this.save_success_path:this.update_success_path;

    return this.appConfig.canvas.open(path);
  }

  server_error_message(){

    return this.appConfig.canvas.open(this.save_error_path);
  }

  is_new_element(){

    return this.appConfig.dataConfig.getValue(this.item,'id', this.type) == 'nuevo'
  }
}

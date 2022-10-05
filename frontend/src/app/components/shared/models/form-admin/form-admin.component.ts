import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormItem } from 'src/app/interfaces/form';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { formAdminTemplate } from './template';

@Component({
  selector: 'app-form-admin',
  template: formAdminTemplate,
  styles: ['']
})
export class FormAdminComponent {

  item!:any;
  type!:DataTypes;
  fields!:FormItem[];

  touched = false; 

  constructor(protected appConfig:AppConfigService) { }

  init(type:DataTypes, fields:FormItem[] = []): void {

    this.item = this.appConfig.canvas.last.query?.formItem || this.appConfig.dataConfig.getModel(type);

    this.type = type;

    this.fields = fields;
 
  }

  save(item:any):any{

    if(!this.is_valid(item)) return this.form_error_message();
    
    //console.log(this.is_valid(item))
    this.appConfig.queries.save(this.type,item).pipe(take(1)).subscribe(response=>{
    
      if(!response || response.errors) {   this.server_error_message() }

      else{        
       
        this.server_success_message().pipe(take(1)).subscribe(e=>this.appConfig.canvas.close(response)) 
      }
      
    });
  }

  

  close(item:any){

    this.appConfig.canvas.close(item)
  }

  is_valid(item:any){

    return this.appConfig.dataConfig.validate(item,this.type);
  }

  form_error_message(){

    return this.appConfig.canvas.open(this.get_modal_path('error'),{message:"Hay errores en el formulario", type:'error'});
  }

  server_success_message(){

    let action = this.is_new_element() ? "guardado":"actualizado";

    return this.appConfig.canvas.open(this.get_modal_path('success'),{message:`El elemento se ha ${action} con éxito`, type:'success'});
  }

  server_error_message(){

     return this.appConfig.canvas.open(this.get_modal_path('error'),{message:`Hubo un error en el servidor y no se pudo guardar`, type:'error'});
  }

  is_new_element(){

    return this.appConfig.dataConfig.isNewItem(this.item,this.type)
  }

  get_modal_path(result:string){

    // si el form esta como elemento de form item ya esta en popUp y los mensajes se muestran en la posicion 3
    
    const index = Number(this.appConfig.canvas.currentOutletsIndex.popUp) + 1;

     console.log(`modal-${result}-${index}`)

    return  `modal-${result}-${index}`;
  }

  
}

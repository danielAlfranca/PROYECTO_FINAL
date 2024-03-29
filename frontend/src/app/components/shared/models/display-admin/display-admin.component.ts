import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-admin',
  template: '',
  styles: ['']
})
export class DisplayAdminComponent  {

  item:any;
  section!:string;
  editPath!:string;
  dataDisplay:any;

 
  constructor(protected appConfig:AppConfigService) { }

  init(section:string, editPath?:string){

    this.section = section;
    this.editPath = editPath || 'editar-'+this.section;

    this.item = this.appConfig.canvas.last.query.displayItem;

    this.updateDisplayData(this.item)
  }

  edit(data?:any){

    this.appConfig.canvas.open(this.editPath, {formItem:this.item, editData:data}).pipe(take(1)).subscribe(response=>{
      console.log(response)
      if(response) {this.item = response; this.updateDisplayData(response); }

    });
  }

  updateDisplayData(item:any){}  

  delete(){
    
    this.appConfig.queries.delete(this.section as DataTypes,this.item).pipe(take(1)).subscribe(response=>{

      if(response && !response.errors){ this.successDelete(); } else  { this.errorDelete(); }
      
    });
  }

  value(prop:string){

    return this.appConfig.dataConfig.getValue(this.item,prop,this.section);
  }

  successDelete(msg?:any){

    this.appConfig.canvas.open(this.get_modal_path('success'),{message:"Elemento eliminado con exito", type:'success'}).pipe(take(1)).subscribe(response=>{

      this.appConfig.canvas.close(msg);
    })
  }

  errorDelete(){

    this.appConfig.canvas.open(this.get_modal_path('error'),{message:"No se pudo eliminar", type:'error'});
  }

  get_modal_path(type:string){

   const index = Number(this.appConfig.canvas.currentOutletsIndex.popUp) + 1;

    return  `delete-${type}-${index}`;
  }



}

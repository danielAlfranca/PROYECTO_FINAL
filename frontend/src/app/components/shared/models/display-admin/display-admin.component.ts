import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
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

  deleteSuccess ='delete-success';
  deleteError ='delete-error';
  
  constructor(protected appConfig:AppConfigService) { }

  init(section:string, editPath?:string){

    this.section = section;
    this.editPath = editPath || 'editar-'+this.section;

    this.item = this.appConfig.canvas.last.query.displayItem;

    this.updateDisplayData(this.item)
  }

  edit(){

    this.appConfig.canvas.open(this.editPath, {formItem:this.item}).pipe(take(1)).subscribe(response=>{

      if(response) {this.item = response; this.updateDisplayData(response) }

    });
  }

  updateDisplayData(item:any){}  

  delete(){

    this.appConfig.queries.delete(this.section,this.item).pipe(take(1)).subscribe(response=>{

      if(response && !response.errors){ this.successDelete(); } else  { this.errorDelete(); }
      
    });
  }

  value(prop:string){

    return this.appConfig.dataConfig.getValue(this.item,prop,this.section);
  }

  successDelete(){

    this.appConfig.canvas.open(this.deleteSuccess).pipe(take(1)).subscribe(response=>{

      this.appConfig.canvas.close();
    })
  }

  errorDelete(){

    this.appConfig.canvas.open(this.deleteError).pipe(take(1)).subscribe(response=>{

      this.appConfig.canvas.close();
    })
  }


}

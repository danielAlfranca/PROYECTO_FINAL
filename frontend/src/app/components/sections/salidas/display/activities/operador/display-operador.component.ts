import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-display-operador',
  templateUrl: './display-operador.component.html',
  styleUrls: ['./display-operador.component.scss']
})
export class DisplayOperadorComponent extends DisplayAdminComponent implements OnInit {

  title!:string;
  salida!:any;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('operadorActivity'); }

  override init(section:string, editPath?:string){

    super.init(section, editPath);
    this.salida = this.appConfig.canvas.last.query.editData;            
  }

  override updateDisplayData(item: any): void {
    
    this.title = "Servicio de Operador";     
    
  }

  override successDelete(){

    this.appConfig.canvas.open(this.get_modal_path('success'),{message:"Elemento eliminado con exito", type:'success'}).pipe(take(1)).subscribe(response=>{

      this.appConfig.canvas.close('deleted');
    })
  }

  override edit(data?:any){

    this.appConfig.canvas.open(this.editPath, {formItem:this.item, editData:this.salida}).pipe(take(1)).subscribe(response=>{

      if(response) { this.appConfig.canvas.close(response) }

    });
  }

}

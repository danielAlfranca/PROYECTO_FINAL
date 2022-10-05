import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-tour-activity-display',
  templateUrl: './tour-activity-display.component.html',
  styleUrls: ['./tour-activity-display.component.scss']
})
export class TourActivityDisplayComponent extends DisplayAdminComponent implements OnInit {

  title!:string;
  reserva!:any;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('tourActivity'); }

  override init(section:string, editPath?:string){

    super.init(section, editPath);
    this.reserva = this.appConfig.canvas.last.query.editData;            
  }


  override updateDisplayData(item: any): void {
    
    this.title = this.appConfig.dataConfig.getValue(this.item,'tour_nombre', 'tourActivity');     
  }

  override successDelete(){

    this.appConfig.canvas.open(this.get_modal_path('success'),{message:"Elemento eliminado con exito", type:'success'}).pipe(take(1)).subscribe(response=>{

      this.appConfig.canvas.close('deleted');
    })
  }

  override edit(data?:any){

    this.appConfig.canvas.open(this.editPath, {formItem:this.item, editData:this.reserva}).pipe(take(1)).subscribe(response=>{

      if(response) { this.appConfig.canvas.close(response) }

    });
  }
}
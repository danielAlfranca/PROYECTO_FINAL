import { Component, OnInit } from '@angular/core';
import { DisplayAdminComponent } from 'src/app/components/shared/models/display-admin/display-admin.component';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-passenger-cliente',
  templateUrl: './passenger-cliente.component.html',
  styleUrls: ['./passenger-cliente.component.scss']
})
export class PassengerClienteComponent extends DisplayAdminComponent implements OnInit {

  title!:string;

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void {  this.init('tourActivity'); }

  override updateDisplayData(item: any): void {
    
    this.title = this.appConfig.dataConfig.getValue(this.item,'nombre_cliente', 'tourActivity') + ' - ' + this.appConfig.dataConfig.getValue(this.item,'apellidos_cliente', 'tourActivity');     
  }

  override delete(){

    this.appConfig.dataConfig.setValue(this.item,'salida',this.section,null);
    
    this.appConfig.queries.save(this.section as DataTypes,this.item).pipe(take(1)).subscribe(response=>{

      if(response && !response.errors){ this.successDelete(); } else  { this.errorDelete(); }
      
    });
  }

  override successDelete(){

    this.appConfig.canvas.open(this.get_modal_path('success'),{message:"Elemento eliminado de la salida", type:'success'}).pipe(take(1)).subscribe(response=>{

      this.appConfig.canvas.close('deleted');
    })
  }

}

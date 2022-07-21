import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-new-inventario',
  templateUrl: './new-inventario.component.html',
  styleUrls: ['./new-inventario.component.scss']
})
export class NewInventarioComponent  {

  options = [

    {name:'Empresa', icono:'briefcase', path:'form-empresa'},
    {name:'Trabajador', icono:'person', path:'form-trabajador'},
    {name:'Tour', icono:'camera', path:'form-tour'},
    {name:'Hotel', icono:'house', path:'form-hotel'},
  ]
  constructor(private appConfig:AppConfigService) { }

  open(path:string){

    this.appConfig.canvas.open(path);
  }

}

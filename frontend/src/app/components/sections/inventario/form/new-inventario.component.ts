import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-new-inventario',
  templateUrl: './new-inventario.component.html',
  styles: ['']
})
export class NewInventarioComponent  {

  options = [

    {name:'Empresa', icono:'briefcase', path:'form-empresa', type:'empresa'},
    {name:'Trabajador', icono:'person', path:'form-trabajador', type:'trabajador'},
    {name:'Tour', icono:'camera', path:'form-tour', type:'tour'},
    {name:'Hotel', icono:'house', path:'form-hotel', type:'hotel'},
  ]
  constructor(private appConfig:AppConfigService) { }

  open(option:any){

    this.appConfig.canvas.open(option.path, {formItem:null}).pipe(take(1)).subscribe(response=>{      
      
      if(response) this.appConfig.canvas.close({item:response, type:option.type})
    
    });
  }

}

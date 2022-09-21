import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-salida-activity',
  templateUrl: './salida-activity.component.html',
  styleUrls: ['./salida-activity.component.scss']
})
export class SalidaActivityComponent implements OnInit{

  outlet!:string

  options:any;

  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {

    const index = this.appConfig.canvas.last.outlet =="aside-2" ? "":"-2";

    this.options = [

      {name:'Operador', icono:'briefcase', path:'form-operadorActivity'+index, type:'operadorActivity'},
      {name:'Guiado', icono:'chat-dots', path:'form-guiadoActivity'+index, type:'guiadoActivity'},
      {name:'Chofer', icono:'speedometer', path:'form-choferActivity'+index, type:'choferActivity'},
    ]
  }

  open(option:any){

    this.appConfig.canvas.open(option.path, {formItem:null}).pipe(take(1)).subscribe(response=>{      
      
      if(response) this.appConfig.canvas.close({item:response, type:option.type})
    
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-salida-activity',
  templateUrl: './salida-activity.component.html',
  styleUrls: ['./salida-activity.component.scss']
})
export class SalidaActivityComponent implements OnInit{

  salida!:any

  options:any;

  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {

   this.salida = this.appConfig.canvas.last.query.editData; 

    this.options = [

      {name:'Operador', icono:'briefcase', path:'form-operadorActivity', type:'operadorActivity'},
      {name:'Guiado', icono:'chat-dots', path:'form-guiadoActivity', type:'guiadoActivity'},
      {name:'Chofer', icono:'speedometer', path:'form-choferActivity', type:'choferActivity'},
    ]
  }

  open(option:any){

    this.appConfig.canvas.open(option.path, {formItem:null}).pipe(take(1)).subscribe(response=>{      
      
      if(response) this.appConfig.canvas.close({item:response, type:option.type})
    
    });
  }

}

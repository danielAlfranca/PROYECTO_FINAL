import { Component, OnInit,TemplateRef } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  slide:number = 1;
  selected!:string
  slideContent!:TemplateRef<any>
    

  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {

    this.appConfig.login();
    
  }

  login(){ this.appConfig.login(); }

  probar(){

    setTimeout(()=>this.login(), 2000)

  }

}

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
  
  user ="email@fake.com";
  pass = "123abc";

  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {

    const user = "email@fake.com", pass = "123abc";

    this.appConfig.login(this.user, this.pass);
    
  }

  login(){ this.appConfig.login(this.user, this.pass); }

  probar(){

    setTimeout(()=>this.login(), 2000)

  }

}

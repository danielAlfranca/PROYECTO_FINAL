import { Component, OnInit,Output,TemplateRef } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  slide:number = 1;
  selected!:string
  slideContent!:TemplateRef<any>

  constructor(private appConfig:AppConfigService) {

    appConfig.queries.$dataUpdates.subscribe(e=>this.slide=1)

    this.probar();
   }

  login(data:any){ 
    
    if(data.type=='register') this.register(data)
    
    return this.appConfig.queries.login(data.email, data.password).subscribe((response:any)=>{

      if(response===true){

        this.appConfig.init();
      }

    }); 

  }

  register(data:any){

    if(data.type=='login') this.login(data)
    
    return this.appConfig.queries.register(data.email, data.password).subscribe((response:any)=>{
  
      if(response===true){

        this.appConfig.init();
        
      }

    }); 
  }

  probar(){

    this.login({email:"email@fake.com", password:"123abc", type:'login'});

  }



}

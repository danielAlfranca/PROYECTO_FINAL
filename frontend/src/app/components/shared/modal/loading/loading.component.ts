import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {


  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void { this.config(); }

  config(){

    const config = this.appConfig.canvas.last.query;

    config.query.pipe(take(1)).subscribe((response:any) => setTimeout(()=>this.back(response),1500));  
         
  }

  

  back(response?:boolean){  this.appConfig.canvas.close(response); }

}

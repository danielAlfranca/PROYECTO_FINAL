import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  type = "";
  message = "";
  button = "aceptar";

  icon!:string
  btnColor!:string;

  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void { this.config(); }

  config(){

    const config = this.appConfig.canvas.last.query;

    this.message = config.message;
    this.type = config.type;
    this.icon = this.getIcon(this.type) as string;
    this.btnColor = this.getButtonColor(this.type) as string;
    
  }

  getIcon(type:string){

    return {

      info: 'text-primary bi-info-circle-fill',
      success:'text-success bi-check-circle-fill',
      warning:'text-warning bi-exclamation-circle-fill',
      error:'text-danger bi-x-circle-fill',
      question:'text-dark bi-question-circle-fill',
      loading:'text-primary bi-question-circle-fill'

    }[type];
    
  }

  getButtonColor(type:string){

    return {

      info: 'btn-primary',
      success:'btn-success ',
      warning:'btn-warning ',
      error:'btn-danger',
      question:'btn-secondary',
      loading:'btn-secondary'

    }[type];
    
  }

  back(response?:boolean){  this.appConfig.canvas.close(response); }

}

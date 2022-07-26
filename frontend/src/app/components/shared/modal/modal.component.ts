import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  message = "";
  button = "aceptar";
  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {

    this.message = this.appConfig.canvas.last.data.message;
    this.button = this.appConfig.canvas.last.data.button || this.button;
  }

  back(){

    this.appConfig.canvas.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-trabajador',
  templateUrl: './display-trabajador.component.html',
  styleUrls: ['./display-trabajador.component.scss']
})
export class DisplayTrabajadorComponent implements OnInit {

  constructor(private appConfig: AppConfigService) { }

  ngOnInit(): void {
  }

  editar(){

    this.appConfig.canvas.open('editar-inventario')
  }


}

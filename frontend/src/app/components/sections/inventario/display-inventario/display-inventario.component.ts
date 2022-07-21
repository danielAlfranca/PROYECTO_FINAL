import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-inventario',
  templateUrl: './display-inventario.component.html',
  styleUrls: ['./display-inventario.component.scss']
})
export class DisplayInventarioComponent implements OnInit {

  constructor(private appConfig: AppConfigService) { }

  ngOnInit(): void {
  }

  editar(){

    this.appConfig.canvas.open('editar-inventario')
  }

}

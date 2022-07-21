import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-display-empresa',
  templateUrl: './display-empresa.component.html',
  styleUrls: ['./display-empresa.component.scss']
})
export class DisplayEmpresaComponent implements OnInit {

  constructor(private appConfig: AppConfigService) { }

  ngOnInit(): void {
  }

  editar(){

    this.appConfig.canvas.open('editar-inventario')
  }
}

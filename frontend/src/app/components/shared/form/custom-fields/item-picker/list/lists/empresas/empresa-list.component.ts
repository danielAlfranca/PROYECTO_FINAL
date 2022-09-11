import { Component, OnInit } from '@angular/core';
import { empresaTable } from 'src/app/fields/empresa';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ModelItemListComponent } from '../model/model-item-list.component';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styles: ['']
})
export class EmpresaListComponent extends ModelItemListComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig); this.type= 'empresa';}

  ngOnInit(): void { this.init([empresaTable]);  }

}

import { Component, OnInit } from '@angular/core';
import { ListPickerAdminComponent } from 'src/app/components/shared/models/list-picker-admin/list-picker-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent extends ListPickerAdminComponent implements OnInit {

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void {

    this.init();
    
  }

  override createTable(): void {
      
    this.tableConfig = { sections:[{

      title:'Empresas',
      name:'empresas',
      dataType:'empresa',
      data:this.appConfig.queries.section('empresa'),
      columns:[

       { 
          title:'Nombre',
          sort:'nombre'
        },
        { 
          title:'Documento',
          sort:'documento'
        },
        { 
          title:'Direccion',
          sort:'direccion'
        },
        { 
          title:'Contacto',
        }
      ],
      search:[

        'nombre','documento', 'lista_emails', 'direccion', 'lista_telefonos'
      ]
    }]};
  }

  

}

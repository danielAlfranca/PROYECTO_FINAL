import { Component, OnInit } from '@angular/core';
import { SectionComponent } from 'src/app/components/shared/models/section/section.component';
import { TableSection } from 'src/app/interfaces/table';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-inventario-section',
  templateUrl: './inventario-section.component.html',
  styleUrls: ['./inventario-section.component.scss']
})
export class InventarioSectionComponent extends SectionComponent implements OnInit {

  protected override section = 'inventario' as DataTypes;
  
  constructor(protected override appConfig:AppConfigService) { 
    
    super(appConfig);
    this.subscription = this.appConfig.queries.$dataUpdates.subscribe(e=>console.log(this.createTableSections())) 
  
  } 

   ngOnInit(): void {

      this.tableConfig = {
        sections:this.createTableSections(),
        sectionsStyle:'select'
      };    
   }

  protected createTableSections(): TableSection|any {
      
    const queries = this.appConfig.queries;

    const empresas = {

      title:'Empresas',
      name:'empresas',
      dataType:'empresas',
      data:queries.section('empresa'),
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
    };

    const trabajadores = {

      title:'Trabajadores',
      name:'trabajadores',
      dataType:'trabajadores',
      data:queries.section('trabajador'),
      columns:[

       { 
          title:'Nombre',
          sort:'nombre_completo'
        },
        { 
          title:'Documento',
          sort:'documento'
        },
        { 
          title:'Tipo',
          sort:'nombre_tipo'
        },
        { 
          title:'Direccion',
          sort:'direccion'
        },
        { 
          title:'Contacto',
          name:'contacto'
        },

      ],
      search:[

        'nombre','documento', 'lista_emails', 'direccion', 'lista_telefonos', 'nombre_tipo' , 'nombre_regimen'
      ]
    };

    const tours = {

      title:'Tours',
      name:'tours',
      dataType:'tours',
      data:queries.section('tour'),
      columns:[

       { 
          title:'Nombre',
          sort:'nombre'
        },
        { 
          title:'Destino',
          sort:'destino'
        },
        { 
          title:'horario',
          sort:'horario_completo'
        }       

      ],
      search:[

        'nombre','destino', 'horario_completo'
      ]
    };

    const hoteles = {

      title:'Hoteles',
      name:'hoteles',
      dataType:'hoteles',
      data:queries.section('hotel'),
      columns:[

       { 
          title:'Nombre',
          sort:'nombre'
        },
        { 
          title:'Tipo',
          sort:'nombre_tipo'
        },
        { 
          title:'direccion',
          sort:'direccion'
        },
        { 
          title:'contacto',
          sort:'lista_emails'
        },
        { 
          title:'Empresa asociada',
          sort:'nombre_propietario'
        },


      ],
      search:[

        'nombre', 'lista_emails', 'direccion', 'lista_telefonos', 'nombre_tipo' ,'nombre_propietario'
      ]
    };

    return [

      empresas, 
      trabajadores,
      tours, 
      hoteles
    ];

  }


    


}

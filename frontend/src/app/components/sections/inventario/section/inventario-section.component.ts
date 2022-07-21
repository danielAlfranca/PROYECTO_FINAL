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

  empresas:any;
  hoteles:any;
  tours:any;
  trabajadores:any;
  
  constructor(protected override appConfig:AppConfigService) { 
    
    super(appConfig);
    
    this.subscription = this.appConfig.queries.$dataUpdates.subscribe(e=>{
      
      this.tableConfig = {
        sections:this.createTableSections(),
        sectionsStyle:'select'
      };     
    }) 

  } 

   ngOnInit(): void {

      this.tableConfig = {
        sections:this.createTableSections(),
        sectionsStyle:'select'
      };       
  }

  protected createTableSections(): TableSection|any {
      
    const empresas = {

      title:'Empresas',
      name:'empresas',
      dataType:'empresa',
      data:this.getData('empresa'),
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
      dataType:'trabajador',
      data:this.getData('trabajador'),
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
          title:'Contacto',
          name:'contacto'
        },

      ],
      search:[

        'nombre','documento', 'lista_emails', 'lista_telefonos', 'nombre_tipo' , 'nombre_regimen'
      ]
    };

    const tours = {

      title:'Tours',
      name:'tours',
      dataType:'tour',
      data:this.getData('tour'),
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
      dataType:'hotel',
      data:this.getData('hotel'),
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
          title:'Empresa asociada',
          sort:'nombre_propietario'
        },


      ],
      search:[

        'nombre', 'direccion', 'estrellas', 'nombre_tipo' ,'nombre_propietario'
      ]
    };

    return [ empresas, trabajadores, tours, hoteles ];

  }


    


}

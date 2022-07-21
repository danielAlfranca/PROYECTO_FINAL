import { DisplayEmpresaComponent } from "../components/sections/inventario/display-inventario/display-empresa/display-empresa.component";
import { DisplayTrabajadorComponent } from "../components/sections/inventario/display-inventario/display-trabajador/display-trabajador.component";
import { InventarioSectionComponent } from "../components/sections/inventario/inventario-section/inventario-section.component";
import { NewInventarioComponent } from "../components/sections/inventario/new-inventario/new-inventario.component";

export const inventarioRoutes = [

    { path: 'inventario', component: InventarioSectionComponent, data:{

        title:'inventario',
        icon:'bi bi-archive',      
        
    } },
    {
        path: 'new-inventario', component: NewInventarioComponent, outlet:'aside-1', data: {

            title: 'Nuevo Inventario',
            icon: 'bi bi-pencil-fill'
        },
        
    },
    {
        path: 'display-empresa', component: DisplayEmpresaComponent, outlet:'aside-1', data: {

            title: 'Detalles Empresa',
            icon: 'bi bi-search-heart'
        },
        
    },
    {
        path: 'display-trabajador', component: DisplayTrabajadorComponent, outlet:'aside-1', data: {

            title: 'Detalles Trabajador',
            icon: 'bi bi-search-heart'
        },
        
    },
    {
        path: 'editar-inventario', component: NewInventarioComponent, outlet:'aside-2', data: {

            title: 'Editar',
            icon: 'bi bi-pencil-square'
        },
        
    },
];
import { InventarioSectionComponent } from "../components/sections/inventario/inventario-section/inventario-section.component";

export const inventarioRoutes = [

    { path: 'inventario', component: InventarioSectionComponent, data:{

        title:'inventario',
        icon:'bi bi-archive',
        type:'main',
        data:null,
        discardAll:false
        
    } }
];
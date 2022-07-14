import { SalidasSectionComponent } from "../components/sections/salidas/salidas-section/salidas-section.component";

export const salidasRoutes = [

    { path: 'salidas', component: SalidasSectionComponent, data:{

        index:0,
        title:'salidas',
        icon:'bi bi-truck',
        type:'main',
        data:null,
        discardAll:false
    }  }
];
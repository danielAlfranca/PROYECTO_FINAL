import { ReservasSectionComponent } from "../components/sections/reservas/reservas-section/reservas-section.component";

export const reservasRoutes = [

    { path: 'reservas', component: ReservasSectionComponent, data:{

        index:0,
        title:'reservas',
        icon:'bi bi-bookmark',
        type:'main',
        data:null,
        discardAll:false
    } }

];
import { ResumenComponent } from "../components/sections/resumen/resumen.component";

export const resumenRoutes = [

    { path: 'resumen', component: ResumenComponent,  data:{

        title:'resumen',
        icon:'bi bi-bar-chart',
        type:'primary',
        query:null
    } }
];
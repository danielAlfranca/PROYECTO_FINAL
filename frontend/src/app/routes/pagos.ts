import { PagosSectionComponent } from "../components/sections/pagos/pagos-section/pagos-section.component";

export const pagosRoutes = [

    { path: 'pagos', component: PagosSectionComponent,  data:{

        title:'pagos',
        icon:'bi bi-credit-card',
        type:'main',
        data:null,
        discardAll:false
    } }
];
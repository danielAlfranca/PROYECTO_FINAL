import { SalidasDisplayComponent } from "../components/sections/salidas/display/salidas-display.component";
import { SalidasFormComponent } from "../components/sections/salidas/form/salidas-form.component";
import { SalidasCalendarComponent } from "../components/sections/salidas/salidas-section/calendar/salidas-calendar.component";
import { SalidasSectionComponent } from "../components/sections/salidas/salidas-section/salidas-section.component";

export const salidasRoutes = [

    { path: 'salidas-table', component: SalidasSectionComponent, data:{

        title:'salidas',
        icon:'bi bi-truck',
        type:'primary',
        query:null
    }},

    { path: 'salidas', component: SalidasCalendarComponent, data:{

        title:'salidas',
        icon:'bi bi-truck',
        type:'primary',
        query:null
    }},
    {
        path: 'form-salida', component: SalidasFormComponent, outlet:'aside-1', data: {

            title: 'Nueva Salida',
            icon: 'bi bi-file-plus'
        },        
        
    },
    {
        path: 'display-salida', component: SalidasDisplayComponent, outlet:'aside-1', data: {

            title: 'Detalles Salida',
            icon: 'bi bi-file-search'
        },        
        
    },
];
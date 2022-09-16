import { DisplayChoferComponent } from "../components/sections/salidas/display/activities/chofer/display-chofer.component";
import { DisplayGuiadoComponent } from "../components/sections/salidas/display/activities/guiado/display-guiado.component";
import { DisplayOperadorComponent } from "../components/sections/salidas/display/activities/operador/display-operador.component";
import { DisplayPassengerComponent } from "../components/sections/salidas/display/passenger/display-passenger.component";
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
        path: 'editar-salida', component: SalidasFormComponent, outlet:'aside-2', data: {

            title: 'Editar Salida',
            icon: 'bi bi-file-plus'
        },        
        
    },
    {
        path: 'display-salida', component: SalidasDisplayComponent, outlet:'aside-1', data: {

            title: 'Detalles Salida',
            icon: 'bi bi-file-search'
        },        
        
    },
    {

        path: 'display-choferActivity', component: DisplayChoferComponent, outlet:'aside-2', data: {

            title: 'Detalles Chofer',
            icon: 'bi bi-binoculars'
        },
    },
    {

        path: 'display-guiadoActivity', component: DisplayGuiadoComponent, outlet:'aside-2', data: {

            title: 'Detalles Guia',
            icon: 'bi bi-binoculars'
        },
    },
    {

        path: 'display-operadorActivity', component: DisplayOperadorComponent, outlet:'aside-2', data: {

            title: 'Detalles Operador',
            icon: 'bi bi-binoculars'
        },
    },

    {

        path: 'display-passenger', component: DisplayPassengerComponent, outlet:'aside-2', data: {

            title: 'Detalles Pasajero',
            icon: 'bi bi-binoculars'
        },
    },
];
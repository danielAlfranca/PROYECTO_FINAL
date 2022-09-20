import { DisplayChoferComponent } from "../components/sections/salidas/display/activities/chofer/display-chofer.component";
import { DisplayGuiadoComponent } from "../components/sections/salidas/display/activities/guiado/display-guiado.component";
import { DisplayOperadorComponent } from "../components/sections/salidas/display/activities/operador/display-operador.component";
import { DisplayPassengerComponent } from "../components/sections/salidas/display/passenger/display-passenger.component";
import { SalidasDisplayComponent } from "../components/sections/salidas/display/salidas-display.component";
import { ChoferFormComponent } from "../components/sections/salidas/form/activities/chofer/chofer-form.component";
import { GuiadoFormComponent } from "../components/sections/salidas/form/activities/guiado/guiado-form.component";
import { OperadorFormComponent } from "../components/sections/salidas/form/activities/operador/operador-form.component";
import { SalidaActivityComponent } from "../components/sections/salidas/form/activities/salida-activity/salida-activity.component";
import { CreatePassengerComponent } from "../components/sections/salidas/form/passengers/create-passenger/create-passenger.component";
import { SelectPassengerComponent } from "../components/sections/salidas/form/passengers/select-passenger/select-passenger.component";
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
        }
    },
    {
        path: 'form-salida', component: SalidasFormComponent, outlet:'aside-1', data: {

            title: 'Nueva Salida',
            icon: 'bi bi-file-plus'
        },        
        
    },
    {
        path: 'form-activity-salida', component: SalidaActivityComponent, outlet:'aside-3', data: {

            title: 'Nueva Actividad',
            icon: 'bi bi-file-plus'
        },        
        
    },

    {

        path: 'form-operadorActivity', component: OperadorFormComponent, outlet:'aside-4', data: {

            title: 'Crear nuevo Operador',
            icon: 'bi bi-file-plus'
        },
    },

    {

        path: 'form-guiadoActivity', component: GuiadoFormComponent, outlet:'aside-4', data: {

            title: 'Crear nuevo Guia',
            icon: 'bi bi-file-plus'
        },
    },

    {

        path: 'form-choferActivity', component: ChoferFormComponent, outlet:'aside-4', data: {

            title: 'Crear nuevo chofer',
            icon: 'bi bi-pencil'
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

    {

        path: 'form-activity-operadorActivity', component: OperadorFormComponent, outlet:'aside-3', data: {

            title: 'Editar Operador',
            icon: 'bi bi-pencil'
        },
    },

    {

        path: 'form-activity-guiadoActivity', component: GuiadoFormComponent, outlet:'aside-3', data: {

            title: 'Editar Guia',
            icon: 'bi bi-pencil'
        },
    },

    {

        path: 'form-activity-choferActivity', component: ChoferFormComponent, outlet:'aside-3', data: {

            title: 'Editar chofer',
            icon: 'bi bi-pencil'
        },
    },

    {

        path: 'add-passenger', component: SelectPassengerComponent, outlet:'popUp-1', data: {

            title: 'Seleccionar pasajero',
            icon: 'bi bi-file-plus'
        },

        
    },

    {

        path: 'new-passenger', component: CreatePassengerComponent, outlet:'popUp-2', data: {

            title: 'Añadir pasajero',
            icon: 'bi bi-file-plus'
        },

        
    },
    
];


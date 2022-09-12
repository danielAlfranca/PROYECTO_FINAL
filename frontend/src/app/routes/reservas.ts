
import { ReservasDisplayComponent } from "../components/sections/reservas/display/reservas-display.component";
import { HotelActivityDisplayComponent } from "../components/sections/reservas/display/activities/hotel/hotel-activity-display.component";
import { TourActivityDisplayComponent } from "../components/sections/reservas/display/activities/tour/tour-activity-display.component";
import { ReservasSectionComponent } from "../components/sections/reservas/section/reservas-section.component";
import { ReservaFormComponent } from "../components/sections/reservas/form/reserva/reserva-form.component";
import { NewReservaActivityComponent } from "../components/sections/reservas/form/activities/new-activity/new-reserva-activity.component";
import { TourActivityFormComponent } from "../components/sections/reservas/form/activities/tour/tour-activity-form.component";
import { HotelActivityFormComponent } from "../components/sections/reservas/form/activities/hotel/hotel-activity-form.component";


export const reservasRoutes = [

    {
        path: 'reservas', component: ReservasSectionComponent, data: {

            title: 'reservas',
            icon: 'bi bi-bookmark'
        }
    },
    
    {
        path: 'display-reserva', component: ReservasDisplayComponent, outlet:'aside-1', data: {

            title: 'Detalles Reserva',
            icon: 'bi bi-binoculars'
        },        
        
    },
    {

        path: 'display-tourActivity', component: TourActivityDisplayComponent, outlet:'aside-2', data: {

            title: 'Detalles Tour',
            icon: 'bi bi-binoculars'
        },
    },
    {

        path: 'display-hotelActivity', component: HotelActivityDisplayComponent, outlet:'aside-2', data: {

            title: 'Detalles Hotel',
            icon: 'bi bi-binoculars'
        },
    },
    {
        path: 'form-reserva', component: ReservaFormComponent, outlet:'aside-1', data: {

            title: 'Nueva Reserva',
            icon: 'bi bi-file-plus'
        },        
        
    },
    {
        path: 'form-reserva-activity', component: NewReservaActivityComponent, outlet:'aside-2', data: {

            title: 'Nueva actividad',
            icon: 'bi bi-file-plus'
        },
        
    },
    {
        path: 'form-tour-activity', component: TourActivityFormComponent, outlet:'aside-3', data: {

            title: 'Nuevo Tour',
            icon: 'bi bi-file-plus'
        },
        
    },

    {
        path: 'form-hotel-activity', component: HotelActivityFormComponent, outlet:'aside-3', data: {

            title: 'Nuevo Hotel',
            icon: 'bi bi-file-plus'
        },
        
    },




];
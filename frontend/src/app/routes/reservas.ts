
import { ReservasDisplayComponent } from "../components/sections/reservas/display/reservas-display.component";
import { HotelActivityDisplayComponent } from "../components/sections/reservas/display/activities/hotel/hotel-activity-display.component";
import { TourActivityDisplayComponent } from "../components/sections/reservas/display/activities/tour/tour-activity-display.component";
import { ReservasSectionComponent } from "../components/sections/reservas/section/reservas-section.component";
import { ReservaFormComponent } from "../components/sections/reservas/form/reserva/reserva-form.component";


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

        path: 'display-tourActivity', component: TourActivityDisplayComponent, outlet:'popUp-1', data: {

            title: 'Detalles Tour',
            icon: 'bi bi-binoculars'
        },
    },
    {

        path: 'display-hotelActivity', component: HotelActivityDisplayComponent, outlet:'popUp-1', data: {

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




];
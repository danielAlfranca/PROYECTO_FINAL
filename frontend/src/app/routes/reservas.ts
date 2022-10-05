
import { ReservasDisplayComponent } from "../components/sections/reservas/display/reservas-display.component";
import { HotelActivityDisplayComponent } from "../components/sections/reservas/display/activities/hotel/hotel-activity-display.component";
import { TourActivityDisplayComponent } from "../components/sections/reservas/display/activities/tour/tour-activity-display.component";
import { ReservasSectionComponent } from "../components/sections/reservas/section/reservas-section.component";
import { ReservaFormComponent } from "../components/sections/reservas/form/reserva/reserva-form.component";
import { NewReservaActivityComponent } from "../components/sections/reservas/form/activities/new-activity/new-reserva-activity.component";
import { TourActivityFormComponent } from "../components/sections/reservas/form/activities/tour/tour-activity-form.component";
import { HotelActivityFormComponent } from "../components/sections/reservas/form/activities/hotel/hotel-activity-form.component";
import { RoomListPopUpComponent } from "../components/shared/form/custom-fields/rooms-list/room-list-pop-up/room-list-pop-up.component";
import { ReservasCalendarComponent } from "../components/sections/reservas/section/reservas-calendar/reservas-calendar.component";


export const reservasRoutes = [

    {
        path: 'reservas', component: ReservasSectionComponent, data: {

            title: 'reservas',
            icon: 'bi bi-bookmark'
        }
    },
    {
        path: 'reservas-calendar', component: ReservasCalendarComponent, data: {

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
            icon: 'bi bi-binoculars',
            size:'form'
        },
    },
    {

        path: 'display-hotelActivity', component: HotelActivityDisplayComponent, outlet:'popUp-1', data: {

            title: 'Detalles Hotel',
            icon: 'bi bi-binoculars',
            size:'form'
        },
    },
    {
        path: 'form-reserva', component: ReservaFormComponent, outlet:'aside-1', data: {

            title: 'Nueva Reserva',
            icon: 'bi bi-file-plus'
        },        
        
    }, 
    {
        path: 'form-reserva-activity', component: NewReservaActivityComponent, outlet:'popUp-1', data: {

            title: 'Nueva actividad',
            icon: 'bi bi-file-plus',
            size:'modal'
        },        
        
    }, 
    {
        path: 'nueva-tourActivity', component: TourActivityFormComponent, outlet:'popUp-2', data: {

            title: 'Nuevo Servicio de Tour',
            icon: 'bi bi-file-plus',
            size:'form'
        },        
        
    },
    {
        path: 'nueva-hotelActivity', component: HotelActivityFormComponent, outlet:'popUp-2', data: {

            title: 'Nuevo Servicio de Hotel',
            icon: 'bi bi-file-plus',
            size:'form'
        },        
        
    },     

    {
        path: 'rooms-list', component: RoomListPopUpComponent, outlet:'popUp-3', data: {

            title: 'Lista de habitaciones',
            icon: 'bi bi-hand-index',
            size:'modal'           
        }
        
    },

    {
        path: 'editar-reserva', component: ReservaFormComponent, outlet:'aside-2', data: {

            title: 'Editar Reserva',
            icon: 'bi bi-pen'
        },        
        
    },
    {
        path: 'editar-tourActivity', component: TourActivityFormComponent, outlet:'popUp-2', data: {

            title: 'Editar Tour',
            icon: 'bi bi-pen',
            size:'form' 
        },        
        
    },

    {
        path: 'editar-hotelActivity', component: HotelActivityFormComponent, outlet:'popUp-2', data: {

            title: 'Editar Hotel',
            icon: 'bi bi-pen',
            size:'form' 
        },        
        
    }
    

];
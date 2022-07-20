
import { ReservasSectionComponent } from "../components/sections/reservas/reservas-section/reservas-section.component";
import { TabsHeaderComponent } from "../components/shared/tabs/tabs-header/tabs-header.component";
import { TabsComponent } from "../components/shared/tabs/tabs.component";

export const reservasRoutes = [

    {
        path: 'reservas', component: ReservasSectionComponent, data: {

            title: 'reservas',
            icon: 'bi bi-bookmark'
        }
    },
    {
        path: 'ejemplo-1', component: TabsComponent, outlet:'aside-1', data: {

            title: 'Ejemplo 1 - Aside',
            icon: 'bi bi-bookmark'
        },
        
    },
    {
        path: 'ejemplo-2', component: TabsComponent, outlet:'aside-2', data: {

            title: 'Ejemplo 2 - Aside',
            icon: 'bi bi-bookmark'
        },        
    },

    {
        path: 'ejemplo-3', component: TabsComponent, outlet:'popUp-1', data: {

            title: 'Ejemplo 3 - popUp',
            icon: 'bi bi-bookmark'
        },        
    },
    {
        path: 'ejemplo-4', component: TabsComponent, outlet:'popUp-2', data: {

            title: 'Ejemplo 4 - popUp',
            icon: 'bi bi-bookmark'
        },        
    },



];
import { DisplayEmpresaComponent } from "../components/sections/inventario/display/empresa/display-empresa.component";
import { DisplayTrabajadorComponent } from "../components/sections/inventario/display/trabajador/display-trabajador.component";
import { InventarioSectionComponent } from "../components/sections/inventario/section/inventario-section.component";
import { NewInventarioComponent } from "../components/sections/inventario/form/new-inventario.component";
import { EmpresaFormComponent } from "../components/sections/inventario/form/empresa/empresa-form.component";
import { TrabajadorFormComponent } from "../components/sections/inventario/form/trabajador/trabajador-form.component";
import { TourFormComponent } from "../components/sections/inventario/form/tour/tour-form.component";
import { HotelFormComponent } from "../components/sections/inventario/form/hotel/hotel-form.component";
import { DisplayTourComponent } from "../components/sections/inventario/display/tour/display-tour.component";
import { DisplayHotelComponent } from "../components/sections/inventario/display/hotel/display-hotel.component";
import { ModalComponent } from "../components/shared/modal/modal.component";

export const inventarioRoutes = [

    { path: 'inventario', component: InventarioSectionComponent, data:{

        title:'inventario',
        icon:'bi bi-archive',      
        
    } },
    {
        path: 'form-inventario', component: NewInventarioComponent, outlet:'aside-1', data: {

            title: 'Nuevo Item',
            icon: 'bi bi-file-plus'
        },
        
    },
    {
        path: 'form-empresa', component: EmpresaFormComponent, outlet:'aside-2', data: {

            title: 'Nueva Empresa',
            icon: 'bi bi-file-plus'
        },
        
    },
    {
        path: 'form-trabajador', component: TrabajadorFormComponent, outlet:'aside-2', data: {

            title: 'Nuevo trabajador',
            icon: 'bi bi-file-plus'
        },
        
    },
    {
        path: 'form-tour', component: TourFormComponent, outlet:'aside-2', data: {

            title: 'Nuevo tour',
            icon: 'bi bi-file-plus'
        },
        
    },
    {
        path: 'form-hotel', component: HotelFormComponent, outlet:'aside-2', data: {

            title: 'Nuevo Hotel',
            icon: 'bi bi-file-plus'
        },
        
    },
    {
        path: 'display-empresa', component: DisplayEmpresaComponent, outlet:'aside-1', data: {

            title: 'Detalles Empresa',
            icon: 'bi bi-search-heart'
        },
        
    },
    {
        path: 'display-trabajador', component: DisplayTrabajadorComponent, outlet:'aside-1', data: {

            title: 'Detalles Trabajador',
            icon: 'bi bi-search-heart'
        },
        
    },
    {
        path: 'display-tour', component: DisplayTourComponent, outlet:'aside-1', data: {

            title: 'Detalles Tour',
            icon: 'bi bi-search-heart'
        },
        
    },
    {
        path: 'display-hotel', component: DisplayHotelComponent, outlet:'aside-1', data: {

            title: 'Detalles Hotel',
            icon: 'bi bi-search-heart'
        },
        
    },
    {
        path: 'editar-empresa', component: EmpresaFormComponent, outlet:'aside-2', data: {

            title: 'Editar Empresa',
            icon: 'bi bi-pencil-square'
        },
        
    },
    {
        path: 'editar-trabajador', component: TrabajadorFormComponent, outlet:'aside-2', data: {

            title: 'Editar trabajador',
            icon: 'bi bi-pencil-square'
        },
        
    },
    {
        path: 'editar-tour', component: TourFormComponent, outlet:'aside-2', data: {

            title: 'Editar tour',
            icon: 'bi bi-pencil-square'
        },
        
    },
    {
        path: 'editar-hotel', component: HotelFormComponent, outlet:'aside-2', data: {

            title: 'Editar Hotel',
            icon: 'bi bi-pencil-square'
        },
        
    }
    
];
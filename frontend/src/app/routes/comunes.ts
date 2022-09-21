import { DateTimePickerComponent } from "../components/shared/form/custom-fields/date-time-picker/date-time-picker.component";
import { ItemFormComponent } from "../components/shared/form/custom-fields/item-picker/form/item-form.component";
import { ItemListComponent } from "../components/shared/form/custom-fields/item-picker/list/item-list.component";
import { ModalComponent } from "../components/shared/modal/modal.component";

export const comunesRoutes = [

   
    {
        path: 'modal-success-1', component: ModalComponent, outlet:'popUp-1', data: {

            title: 'Operación exitosa',
            icon: 'bi bi-pencil-square',
            size:'modal',
            color:'success'           
        }        
    },
    {
        path: 'modal-success-3', component: ModalComponent, outlet:'popUp-3', data: {

            title: 'Operación exitosa',
            icon: 'bi bi-pencil-square',
            size:'modal',
            color:'success'           
        }        
    },
    {
        path: 'modal-error-1', component: ModalComponent, outlet:'popUp-1', data: {

            title: 'Error',
            icon: 'bi bi-pencil-square',
            size:'modal',
            color:'danger'           
        }        
    },
    {
        path: 'modal-error-3', component: ModalComponent, outlet:'popUp-3', data: {

            title: 'Error',
            icon: 'bi bi-pencil-square',
            size:'modal',
            color:'danger'           
        }        
    },


    //FORM PICKERS

    {
        path: 'pop-up-list', component: ItemListComponent, outlet:'popUp-1', data: {

            title: 'Lista de elementos',
            icon: 'bi bi-file-plus',
            size:'list'            
        },
        
    },
    {
        path: 'pop-up-form', component: ItemFormComponent, outlet:'popUp-2', data: {

            title: 'Nuevo Item',
            icon: 'bi bi-file-plus',
            size:'list'           
        }
        
    },
    {
        path: 'date-time-picker', component: DateTimePickerComponent, outlet:'popUp-1', data: {

            title: 'Selecciona una fecha',
            icon: 'bi bi-calendar',
            size:'modal'           
        }
        
    },
];
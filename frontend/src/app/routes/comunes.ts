import { SelectCustomDateComponent } from "../components/layout/header/select-data-dates/select-custom-date/select-custom-date.component";
import { SelectDataDatesComponent } from "../components/layout/header/select-data-dates/select-data-dates.component";
import { ItemFormComponent } from "../components/shared/form/custom-fields/item-picker/form/item-form.component";
import { ItemListComponent } from "../components/shared/form/custom-fields/item-picker/list/item-list.component";
import { LoadingComponent } from "../components/shared/modal/loading/loading.component";
import { ModalComponent } from "../components/shared/modal/modal.component";

const popUpOutlets = 4;
export const comunesRoutes = [

    ... new Array(popUpOutlets).fill(1).map((e:number,i:number)=>({

            path: 'modal-success-'+(e+i), component: ModalComponent, outlet:'popUp-'+(e+i), data: {

                title: 'Operación exitosa',
                icon: 'bi bi-pencil-square',
                size:'modal',
                color:'success'           
            }        
    })),
    ... new Array(popUpOutlets).fill(1).map((e:number,i:number)=>({

        path: 'modal-error-'+(e+i), component: ModalComponent, outlet:'popUp-'+(e+i), data: {

            title: 'Error',
            icon: 'bi bi-pencil-square',
            size:'modal',
            color:'danger'           
        }        
    })),
    ... new Array(popUpOutlets).fill(1).map((e:number,i:number)=>({

        path: 'delete-success-'+(e+i), component: ModalComponent, outlet:'popUp-'+(e+i), data: {

            title: 'Eliminacion exitosa',
            icon: 'bi bi-pencil-square',
            size: 'modal',
            color:'success'          
        } 
    })),
    ... new Array(popUpOutlets).fill(1).map((e:number,i:number)=>({

        path: 'delete-error-'+(e+i), component: ModalComponent, outlet:'popUp-'+(e+i), data: {

            title: 'Fallo',
            icon: 'bi bi-pencil-square',
            size: 'modal',
            color:'danger'          
        } 
    })),
    ... new Array(popUpOutlets).fill(1).map((e:number,i:number)=>({

        path: 'loading-'+(e+i), component: LoadingComponent, outlet:'popUp-'+(e+i), data: {

            title: 'Esperando respuesta del servidor...',
            icon: 'bi bi-clock',
            size: 'modal'          
        } 
    })),

    //FORM PICKERS

    ... new Array(popUpOutlets).fill(1).map((e:number,i:number)=>({

        path: 'pop-up-list-'+(e+i), component: ItemListComponent, outlet:'popUp-'+(e+i), data: {

            title: 'Lista de elementos',
            icon: 'bi bi-file-plus',
            size:'list'         
        } 
    })),
    ... new Array(popUpOutlets).fill(1).map((e:number,i:number)=>({

        path: 'pop-up-form-'+(e+i), component: ItemFormComponent, outlet:'popUp-'+(e+i), data: {

            title: 'Nuevo Item',
            icon: 'bi bi-file-plus',
            size:'form'          
        } 
    })),
    {
        path: 'seleccionar-rango-fecha', component: SelectDataDatesComponent, outlet:'popUp-1', data: {

            title: 'Selecciona una opcion',
            icon: 'bi bi-calendar',
            size:'modal'           
        }        
    },
    {
        path: 'seleccionar-rango-fecha-personalizado', component: SelectCustomDateComponent, outlet:'popUp-2', data: {

            title: 'Selecciona un rango personalizado',
            icon: 'bi bi-calendar',
            size:'modal'           
        }
        
    },
];
import { EmpresaFormComponent } from "../components/sections/inventario/form/empresa/empresa-form.component";
import { EmpresaListComponent } from "../components/shared/form/custom-fields/item-picker/lists/empresa-list/empresa-list.component";
import { ModalComponent } from "../components/shared/modal/modal.component";

export const comunesRoutes = [

   
    {
        path: 'form-error', component: ModalComponent, outlet:'popUp-1', data: {

            title: 'Error',
            icon: 'bi bi-pencil-square',
            data:{  message:'El formulario esta incompleto o tiene errores' }
        },
        
    },
    {
        path: 'save-error', component: ModalComponent, outlet:'popUp-1', data: {

            title: 'Error de servidor',
            icon: 'bi bi-pencil-square',
            data:{  message:'El servidor comunico un error y no se pudieron guardar los cambios' }
        },
        
    },
    {
        path: 'save-success', component: ModalComponent, outlet:'popUp-1', data: {

            title: 'Item guardado',
            icon: 'bi bi-pencil-square',
            data:{  message:'El elemento fue guardado correctamente' }
        },
        
    },
    {
        path: 'update-success', component: ModalComponent, outlet:'popUp-1', data: {

            title: 'Item actualizado',
            icon: 'bi bi-pencil-square',
            data:{  message:'El elemento fue actualizado correctamente' }
        },
        
    },

    {
        path: 'form-picker-error', component: ModalComponent, outlet:'popUp-3', data: {

            title: 'Error',
            icon: 'bi bi-pencil-square',
            data:{  message:'El formulario esta incompleto o tiene errores' }
        },
        
    },
    {
        path: 'save-picker-error', component: ModalComponent, outlet:'popUp-3', data: {

            title: 'Error de servidor',
            icon: 'bi bi-pencil-square',
            data:{  message:'El servidor comunico un error y no se pudieron guardar los cambios' }
        },
        
    },
    {
        path: 'save-picker-success', component: ModalComponent, outlet:'popUp-3', data: {

            title: 'Item guardado',
            icon: 'bi bi-pencil-square',
            data:{  message:'El elemento fue guardado correctamente' }
        },
        
    },
    {
        path: 'update-picker-success', component: ModalComponent, outlet:'popUp-3', data: {

            title: 'Item actualizado',
            icon: 'bi bi-pencil-square',
            data:{  message:'El elemento fue actualizado correctamente' }
        },
        
    },

    //FORM PICKERS

    {
        path: 'pick-empresa', component: EmpresaListComponent, outlet:'popUp-1', data: {

            title: 'Selecciona Empresa',
            icon: 'bi bi-file-plus'
        },
        
    },

    {
        path: 'empresa-form-picker', component: EmpresaFormComponent, outlet:'popUp-2', data: {

            title: 'Nueva Empresa',
            icon: 'bi bi-file-plus',
            data:{

                form_error_path:'form-picker-error',
                save_success_path:'save-picker-success',
                update_success_path:'update-picker-success',
                save_error_path:'save-picker-error'
            }
        },
        
    },
];
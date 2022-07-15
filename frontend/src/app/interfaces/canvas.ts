
import { Deferred } from '../services/canvas-service/deferred';

export type AppSections = 'reservas'|'salidas'|'pagos'|'inventario'|'usuario';
export type CanvasType = 'primary'|'aside'|'popUp';

export interface CanvasConfig{

    canvasID:number;
    title:string,
    icon:string,
    type:CanvasType
    query:any,
    path:string,
    _response:Deferred   

}


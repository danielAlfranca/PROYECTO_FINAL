
import { Subject } from 'rxjs';

export type AppSections = 'reservas'|'salidas'|'pagos'|'inventario'|'usuario';
export type CanvasType = 'primary'|'aside'|'popUp';

export interface CanvasConfig{

    canvasID:number;
    title:string,
    icon:string,
    type:CanvasType
    query:any,
    data?:any,
    path:string,
    outlet:string,
    _responseData:any,
    _response:Subject<any>   

}


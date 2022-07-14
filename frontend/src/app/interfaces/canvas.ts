
export type AppSections = 'reservas'|'salidas'|'pagos'|'inventario'|'usuario';
export type CanvasType = 'main'|'aside'|'popUp';

export interface CanvasConfig{

    index:number,
    title:string,
    icon:string,
    type:CanvasType
    data:any,
    discardAll:boolean
}


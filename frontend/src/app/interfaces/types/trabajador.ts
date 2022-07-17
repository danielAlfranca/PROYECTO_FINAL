import { _Inventory } from "./inventory.model"

export interface Trabajador{

    name:string,
    surname:string,
    document:string,  
    type:string  
    mode:string
    phones:string
    emails:string[]
    hidden:boolean  
}

export interface _Trabajador extends _Inventory{

    3:_TrabajadorData // json    
}

export interface _TrabajadorData{

    0:string // surname and name
    1:string // doc
    2:string // address
    3:string[] // phones
    4:string[]  // emails    
    5:number  // type  
    6:number  // mode  
}



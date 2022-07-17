import { _Inventory } from "./inventory.model"

export interface Empresa{

    name:string,
    document:string,  
    address:string  
    phones:string[] 
    emails:string[]
    hidden:boolean  
}

export interface _Empresa extends _Inventory{

    3:_EmpresaData // json    
}

export interface _EmpresaData{

    0:string // name
    1:string // doc
    2:string // address
    3:string[] // phones
    4:string[]  // emails    
}



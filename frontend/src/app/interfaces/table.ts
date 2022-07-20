import { TemplateRef } from "@angular/core"


export interface TableConfig{

    title?:string,
    dataType?:string,
    hidePlusButton?:boolean,
    hideSearchButton?:boolean,
    sections:TableSection[],
    sectionsStyle?:string,
    extraButton?:{icon:string, color:string},
    columns?:ColumnTable[]
    search?:string[]
}

export interface TableSection{

    title:string,
    name:string,
    data?:any,
    dataType?:string,
    columns?:ColumnTable[],
    search?:string[]
}

export interface ColumnTable{

    title:string,
    order?:number,
    sort?:string
}




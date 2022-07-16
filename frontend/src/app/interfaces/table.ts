import { TemplateRef } from "@angular/core"


export interface TableConfig{

    title:string,
    dataType:string,
    hidePlusButton?:boolean,
    hideSearchButton?:boolean,
    sections:TableSection[],
    sectionsStyle:string,
    extraButton:{icon:string, color:string},
    columns:ColumnTable[]
    search:string[]

}

export interface TableSection{

    title:string,
    name:string,
    filter:(data:any[])=>any[]
}

export interface ColumnTable{

    title:string,
    name:string,
    order?:number,
    sort:string[],
    template:TemplateRef<any>
}






export interface TableConfig{

    title:string,
    hidePlusButton?:boolean,
    hideSearchButton?:boolean,
    sections:TableSection[],
    sectionsStyle:string,
    extraButton:{icon:string, color:string},
    columns:ColumnTable[]

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
    sort:(data:any[])=>any[]
}


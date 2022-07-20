import { Component, Input, OnChanges, SimpleChanges,  ContentChildren, TemplateRef, QueryList, AfterContentInit } from '@angular/core';
import { ColumnTable, TableConfig, TableSection } from 'src/app/interfaces/table';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, AfterContentInit {

  @Input() config!:TableConfig
  @Input() data!:any[];

  @ContentChildren(TemplateRef) rowTemplates!:QueryList<TemplateRef<any>>;

  pages!:number[];

  currentSection:number = 0;
  currentPage:number = 1;
  currentSort = {column:0, sort:0}
  numOfEntries = 15;

  dataType!:string;
  entries:any[] = []; // filtered data
  columns:ColumnTable[] = []; // columns
  sections:string[] =[];
  searchProperties:string[] = []; 
  
  rowTemplate!:TemplateRef<any>  

  constructor(private appConfig:AppConfigService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.rowTemplates){

      if(changes['config']){ this.initSection(0); }

      if(changes['data']){ this.updateEntries(this.data) }
    }      
  }

  ngAfterContentInit(): void {
      
    setTimeout(()=>this.initSection(this.currentSection))
  }

  initSection(sectionIndex:number){

    const section = this.config.sections[sectionIndex];

    this.currentSection = sectionIndex;

    this.columns =( section.columns || this.config.columns) as ColumnTable[];

    this.searchProperties = (section.search || this.config.search) as string[];

    this.dataType  = section.dataType || this.config.dataType as string;

    this.rowTemplate = this.get_template()

    this.updateEntries(this.data);    
  }


  updateEntries(data:any[]){

    const section = this.config.sections[this.currentSection];

    this.entries = this.sort_data(this.data.filter(datum=>section.filter(datum)));

    this.currentPage = 1; 
    
    this.calculate_pages(this.entries);

  }

  updateSort(column:ColumnTable, index:number){

    if(column.sort){

      if(index==this.currentSort.column) this.currentSort.sort = this.currentSort.sort == -1 ? 1:-1

      else { this.currentSort.column = index;  this.currentSort.sort = 1 }

      this.entries = this.sort_data(this.entries);
    }   
    
  }

  private sort_data(data:any[]){

    let valueA, valueB;

    const property = this.columns[this.currentSort.column].sort,
          dataConfig = this.appConfig.dataConfig;

    if( !property || this.currentSort.sort == 0 ) return data;

    return data.sort((a,b)=>  {
      
      valueA = dataConfig.getValue(a,property, this.dataType);
      valueB = dataConfig.getValue(b,property, this.dataType);

      return valueA.localCompare(valueB) * this.currentSort.sort 

    }) 
  }
 
  private calculate_pages(data:any[]){

    const numOfPages = Math.ceil(this.data.length/this.numOfEntries);

    return  new Array(numOfPages).fill(1).map((e,index)=>e+index); 

  }

  private get_template(){ 
    
    // LAS TEMPLATEREF SE PROYECTAN EN NGCONTENT 
    // EN CASO DE HABER UNA POR CADA SECCION SE COLOCAN EN EL MISMO ORDEN QUE LA SECCION QUE CORRESPONDA 

    return this.rowTemplates.get(this.currentSection) // SEGUN EL INDICE DE LA SECCION (EL MISMO ORDEN EN QUE DEBERIA HABER SIDO COLOCADA LA TEMPLATE)
          || this.rowTemplates.get(0) as TemplateRef<any>

  }

}

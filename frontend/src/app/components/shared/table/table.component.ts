import { Component, Input, OnChanges, SimpleChanges,  ContentChildren, TemplateRef, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { ColumnTable, TableConfig, TableSection } from 'src/app/interfaces/table';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, AfterContentInit {

  @Input() config!:TableConfig;
  @Output() buttonClick: EventEmitter<string> = new EventEmitter();

  @ContentChildren(TemplateRef) rowTemplates!:QueryList<TemplateRef<any>>;

  pages!:number[];

  currentSection:number = 0;
  currentPage:number = 1;
  currentSort = {column:0, sort:0}
  numOfEntries = 15;

  data:any = [];
  dataType!:string;
  entries:any[] = []; // filtered data
  columns:ColumnTable[] = []; // columns
  sections:string[] =[];
  searchProperties:string[] = []; 
  
  rowTemplate!:TemplateRef<any>  

  constructor(private appConfig:AppConfigService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.rowTemplates){ this.initSection(this.currentSection); }   
   
  }

  ngAfterContentInit(): void {
      
    setTimeout(()=>{this.initSection(this.currentSection); console.log(this.rowTemplates)})
  }

  initSection(sectionIndex:number){

    const section = this.config.sections[sectionIndex] || {};

    this.currentSection = sectionIndex;

    this.sections = this.config.sections.map(section => section.title);

    this.columns = ( section.columns || this.config.columns || []) as ColumnTable[];

    this.searchProperties = (section.search || this.config.search || []) as string[];

    this.dataType  = (section.dataType || this.config.dataType || "") as string;

    this.data = Object.values(section.data || {}).filter(e=>!(this.appConfig.dataConfig.getValue(e,"hidden", this.dataType)*1)); // TEMPORAL A MEJORAR . SE FILTRAN LOS HIDDEN (DELETE)

    this.rowTemplate = this.get_template();      
   
    this.updateEntries(this.data);      
    
  }


  updateEntries(data:any[]){    

    this.entries = this.sort_data(data);

    this.currentPage = 1;  
    
    this.pages = this.calculate_pages(this.entries); 

  }

  updateSort(column:ColumnTable, index:number){

    if(column.sort){

      if(index==this.currentSort.column) this.currentSort.sort = this.currentSort.sort == -1 ? 1:-1

      else { this.currentSort.column = index;  this.currentSort.sort = 1 }
      
      column.state = this.currentSort.sort;

      this.columns = [...this.columns];

      this.entries = this.sort_data([...this.entries || []]);

    }   
    
  }

  private sort_data(data:any[]){

    let valueA, valueB;

    if(data && data.length){

        const property = this.columns[this.currentSort.column].sort,
            dataConfig = this.appConfig.dataConfig;

      if( !property || this.currentSort.sort == 0 ) return data;


      return data.sort((a,b)=>  {
        
        valueA = dataConfig.getValue(a,property, this.dataType) +'';
        valueB = dataConfig.getValue(b,property, this.dataType)+'';
    
        return valueA.localeCompare(valueB) * this.currentSort.sort 

      }) 

    }

    return []
    
  }
 
  private calculate_pages(data:any[]){

    
    const numOfPages = Math.ceil(data.length/this.numOfEntries);

    return  new Array(numOfPages).fill(1).map((e,index)=>e+index); 

  }

  private get_template(){ 
    
    // LAS TEMPLATEREF SE PROYECTAN EN NGCONTENT 
    // EN CASO DE HABER UNA POR CADA SECCION SE COLOCAN EN EL MISMO ORDEN QUE LA SECCION QUE CORRESPONDA 

    return    this.rowTemplates.get(this.currentSection) ||  // SEGUN EL INDICE DE LA SECCION (EL MISMO ORDEN EN QUE DEBERIA HABER SIDO COLOCADA LA TEMPLATE)
              this.rowTemplates.get(0) as TemplateRef<any>

  }

}

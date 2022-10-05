import { Component, OnInit, Input, Output, EventEmitter,SimpleChanges, OnChanges } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs'

@Component({
  selector: 'app-salidas-activity-table',
  templateUrl: './salidas-activity-table.component.html',
  styleUrls: ['./salidas-activity-table.component.scss']
})
export class SalidasActivityTableComponent implements OnChanges {

  @Input() salida!:any;
  @Input() activities!:{operadores:any[],guias:any[], chofers:any[]};
  @Output() activitiesChange = new EventEmitter();

  public rows!:any[];

  constructor(protected appConfig: AppConfigService) { }

  ngOnChanges(changes: SimpleChanges): void { this.rows = this.createRows(this.activities);  }

  display(item:any, section:string, index:number){    

    return this.appConfig.canvas.open('display-' +section,{displayItem:item, editData:this.salida}).pipe(take(1)).subscribe(response=>{

      if(response){

          if(response=='deleted'){ this.rows.splice(index, 1);}
          else { this.rows[index] = {item:response,type:section}; }          
          this.update(); 
        }
    });   
  }

  form(){

    this.appConfig.canvas.open('salida-reserva-activity',{editData:this.salida}).pipe(take(1)).subscribe(response=>{

        if(response){

          this.rows.push(response);
          this.update();
        }
    });

   }

   createRows(data:{operadores:any[],guias:any[], chofers:any[]}){

      const operadores = data.operadores, guias = data.guias, chofers = data.chofers;

      return operadores .map(e=>({item:e,type:'operadorActivity'}))
                        .concat(guias.map(e=>({item:e,type:'guiadoActivity'})))
                        .concat(chofers.map(e=>({item:e,type:'choferActivity'})));
   }

   update(){

      const operadores = this.rows.filter(e=>e.type=='operadorActivity'), 
            guias = this.rows.filter(e=>e.type=='guiadoActivity'), 
            chofers = this.rows.filter(e=>e.type=='choferActivity'); 
  
      this.activitiesChange.emit({operadores:operadores.map(e=>e.item), guias:guias.map(e=>e.item), chofers:chofers.map(e=>e.item)});

   }
}

import { Component, OnChanges, Input, Output,EventEmitter, SimpleChanges } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs'

@Component({
  selector: 'app-reservas-activity-table',
  templateUrl: './reservas-activity-table.component.html',
  styleUrls: ['./reservas-activity-table.component.scss']
})
export class ReservasActivityTableComponent implements OnChanges{

  @Input() reserva!:any;
  @Input() activities!:{tours:any[],hoteles:any[]};
  @Output() activitiesChange = new EventEmitter();

  public rows!:any[];

  constructor(protected appConfig: AppConfigService) { }

  ngOnChanges(changes: SimpleChanges): void { this.rows = this.createRows(this.activities);  }

  display(item:any, section:string, index:number){
    
    return this.appConfig.canvas.open('display-' +section,{displayItem:item, editData:this.reserva}).pipe(take(1)).subscribe(response=>{

      if(response){

          if(response=='deleted'){ this.rows.splice(index, 1);}
          else { this.rows[index] = {item:response,type:section}; }          
          this.update(); 
        }
    });   
  }

  form(){

    this.appConfig.canvas.open('form-reserva-activity',{editData:this.reserva}).pipe(take(1)).subscribe(response=>{

        if(response){

          this.rows.push(response);
          this.update();
        }
    });

   }

   createRows(data:{tours:any[],hoteles:any[]}){

        const tours = data.tours, hoteles = data.hoteles;

        return tours.map(e=>({item:e,type:'tourActivity'})).concat(hoteles.map(e=>({item:e,type:'hotelActivity'})));
   }

   update(){

      const tours = this.rows.filter(e=>e.type=='tourActivity'), hoteles = this.rows.filter(e=>e.type=='hotelActivity'); 
  
      this.activitiesChange.emit({tours:tours.map(e=>e.item), hoteles:hoteles.map(e=>e.item)});

   }

}

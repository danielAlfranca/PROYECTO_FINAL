import { Component, Input,Output,EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs'

@Component({
  selector: 'app-salidas-passengers',
  templateUrl: './salidas-passengers.component.html',
  styleUrls: ['./salidas-passengers.component.scss']
})
export class SalidasPassengersComponent implements OnChanges {

  @Input() salida!:any;
  @Input() passengers!:{clientes:any[],noClientes:any[]};
  @Output() passengersChange = new EventEmitter();

  public rows!:any[];

  constructor(protected appConfig: AppConfigService) { }

  ngOnChanges(changes: SimpleChanges): void { this.rows = this.createRows(this.passengers);  }

  display(item:any, section:string, index:number){
    
    const path = section == 'tourActivity' ? 'passenger-cliente':section;
    
    return this.appConfig.canvas.open('display-' +path,{displayItem:item, editData:this.salida}).pipe(take(1)).subscribe(response=>{

      if(response){

          if(response=='deleted'){ this.rows.splice(index, 1);}
          else { this.rows[index] = {item:response,type:section}; }          
          this.update(); 
        }
    });   
  }

  form(){

    this.appConfig.canvas.open('passenger-salida-form',{editData:this.salida}).pipe(take(1)).subscribe(response=>{

        if(response){

          this.rows.push(response);
          this.update();
        }
    });

   }

   createRows(data:{clientes:any[],noClientes:any[]}){

        const clientes = data.clientes, noClientes = data.noClientes;

        return clientes .map(e=>({item:e,type:'tourActivity'})).concat(noClientes.map(e=>({item:e,type:'passenger'})));
   }

   update(){

      const clientes = this.rows.filter(e=>e.type=='tourActivity'), noClientes = this.rows.filter(e=>e.type=='passenger'); 
  
      this.passengersChange.emit({clientes:clientes.map(e=>e.item), noClientes:noClientes.map(e=>e.item)});

   }
}

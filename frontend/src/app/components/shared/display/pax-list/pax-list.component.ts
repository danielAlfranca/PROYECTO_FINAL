import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-pax-list',
  templateUrl: './pax-list.component.html',
  styleUrls: ['./pax-list.component.scss']
})
export class PaxListComponent implements OnInit {

  @Input() salida!:string;
  @Input() mode!:string;
  @Input() passengers!:any;

  @Output() paxUpdated = new EventEmitter();

  constructor(protected appConfig:AppConfigService) { }

  ngOnInit(): void { }

  open(item?:any){

    if(this.mode=='display') this.appConfig.canvas.open('display-passenger', {displayItem:item});

    else if(item) this.appConfig.canvas.open('edit-passenger', {formItem:item}).pipe(take(1)).subscribe(response=>{
      
      if(response) {this.update(response)}
    
    });    

    else this.appConfig.canvas.open('add-passenger', {formItem:this.salida}).pipe(take(1)).subscribe(response=>{
      
    
      if(response) {this.update(response)}
    
    });   

  }

  update(item?:any){ // update
    
    let passengers = this.passengers || [], service = this.appConfig.dataConfig; 

    if(item){

      passengers = passengers.filter((e:any)=>{

         return service.getValue(e,'id','passenger')!= service.getValue(item,'id','passenger') || 
                service.getValue(e,'activity','passenger')!= service.getValue(item,'id','passenger')
      });


      passengers.push(item);

      this.passengers = passengers;

    }

    this.paxUpdated.emit(this.passengers)

  }


}

import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-pax-list',
  templateUrl: './pax-list.component.html',
  styleUrls: ['./pax-list.component.scss']
})
export class PaxListComponent implements OnInit {

  @Input() mode!:string;
  @Input() passengers!:any;

  @Output() paxUpdated = new EventEmitter();

  constructor(protected appConfig:AppConfigService) { }

  ngOnInit(): void {}

  open(item?:any){

    if(this.mode=='display') this.appConfig.canvas.open('display-passenger', {displayItem:item});

    else if(item) this.appConfig.canvas.open('edit-passenger', {formItem:item})    

    else this.appConfig.canvas.open('add-passenger', {formItem:item})   

  }


}

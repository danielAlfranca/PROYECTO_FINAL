import { Component, OnInit, Input } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { take } from 'rxjs';
import { CustomFieldComponent } from '../model/custom-field.component';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent  extends  CustomFieldComponent implements OnInit {


  constructor(private appConfig:AppConfigService) { super() }

  ngOnInit(): void {

    this.value ||= [];

  }

  openRooms(){

    this.appConfig.canvas.open('rooms-list', {rooms:this.value}).pipe(take (1)).subscribe(response=>{

      if(response) {this.value = response; this.onChange(response) }

    });
  }

}

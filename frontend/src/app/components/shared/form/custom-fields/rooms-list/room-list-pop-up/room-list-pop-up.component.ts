import { Component, OnInit } from '@angular/core';
import { roomLabels } from 'src/app/pipes/room.pipe';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-room-list-pop-up',
  templateUrl: './room-list-pop-up.component.html',
  styleUrls: ['./room-list-pop-up.component.scss']
})
export class RoomListPopUpComponent implements OnInit {

  rooms:any = [];

  roomLabels = roomLabels;

  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {
    
    this.rooms = this.appConfig.canvas.last.query.rooms || [];
    this.update();

  }

  add(index:number){

    this.rooms[index][1]++;

    this.update()

  }

  substract(index:number){

    const res = this.rooms[index][1] - 1;

    this.rooms[index][1] = res || 1 ;

    this.update()

  }

  remove(index:number){

    this.rooms = this.rooms.filter((e:any,i:number)=>i!=index);
    this.update()
  }

  update(){

    this.rooms = [...this.rooms].map(e=>[...e])
  }

  newroom(value:number|string){

    if(!this.rooms.map((e:any)=>e[0]).includes(Number(value)))   this.rooms.push([Number(value),1]);  
    this.update()

  }

  guardar(){

    this.appConfig.canvas.close(this.rooms)
  }

}

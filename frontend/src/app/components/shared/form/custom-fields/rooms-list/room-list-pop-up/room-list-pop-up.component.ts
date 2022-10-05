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


    
    this.rooms = this.parseRoomsArray(this.appConfig.canvas.last.query.rooms );

    console.log(this.appConfig.canvas.last.query.rooms ,this.rooms )
    this.update();

  }

  add(index:number){

    const arr = this.rooms[index].split('.'),
          num = Number(this.rooms[index].split('.')[1]) +1;

    this.rooms[index]= arr[0]+'.'+num;

    this.update()

  }

  substract(index:number){

    let arr = this.rooms[index].split('.'),
          num = Number(this.rooms[index].split('.')[1]) +1;

    num = num>0 ? num:1;

    this.rooms[index]= arr[0]+'.'+num;

    this.update()

  }

  remove(index:number){

    this.rooms = this.rooms.filter((e:any,i:number)=>i!=index);
    this.update()
  }

  update(){

    this.rooms = [...this.rooms];

  }

  newroom(value:number|string){

    const types = this.rooms.map((e:string)=>e.split('.')[0])

    if(!types.includes(Number(value)))   this.rooms.push((value)+'.'+1);  
    this.update()

  }

  guardar(){

    this.appConfig.canvas.close(this.parseRoomsString(this.rooms))
  }

  parseRoomsArray(str:string = ''){

    return (str).split('-').filter(e=>e);

    
  }

  parseRoomsString(arr:string[][]){

    return arr.join('-')
  }

}

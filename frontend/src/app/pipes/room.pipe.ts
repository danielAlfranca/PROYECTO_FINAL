import { Pipe, PipeTransform } from '@angular/core';

export const roomLabels = {

  '1':['simple','simples'],
  '2':['doble','dobles']
  
 }

@Pipe({
  name: 'room_string'
})
export class RoomPipe implements PipeTransform {

  labels:any ={

    '1':['simple','simples'],
    '2':['doble','dobles']
    
   }
  transform(value: any, isRoomList?: boolean): unknown {

    if(value && Array.isArray(value)){

      if(isRoomList) return value.map(e=>this.getString(e)).join(', ');

      return this.getString(value)
    }

    return null
    
  }

  getString(value: number[]){

    return value[1] + ' ' + this.getWord(value[0],value[1])

  }

  getWord(label:number, num:number){

    return this.labels[label][num==1?0:1]
  }

}

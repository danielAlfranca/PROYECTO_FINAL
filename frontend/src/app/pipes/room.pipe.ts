import { Pipe, PipeTransform } from '@angular/core';

export const roomLabels ={

  '1':['simple','simples'],
  '2':['doble','dobles'],
  '3':['triple','triples'],
  '4':['cuadruple','cuadruples'],
  '5':['familiar','familiares'],
  '6':['matrimonial','matrimoniales'],
 
 }

@Pipe({
  name: 'room_string'
})
export class RoomPipe implements PipeTransform {

  labels:any =roomLabels;
  
  transform(value: any, isRoomList?: boolean): unknown {

    if(value){

      console.log(value)

        if(isRoomList) {
        
        const arr = value.split('-');
        return arr.map((e:any)=>this.getString(e)).join(', ');
      
      }

      return this.getString(value)
    }

    return null
    
  }

  getString(value: string){

    const arr:any = value.split('.');

    return arr[1] + ' ' + this.getWord(arr[0],arr[1])

  }

  getWord(label:number, num:number){

    return this.labels[label][num==1?0:1]
  }

}

import { Component, OnChanges } from '@angular/core';
import { CustomFieldComponent } from '../model/custom-field.component';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss']
})
export class PassengersListComponent extends CustomFieldComponent implements OnChanges {

  adultos:any = 0;
  ninos:any = 0;
  infantes:any = 0;

  constructor() { super() }

  

  ngOnChanges(): void {

    const pax = ((this.value || '') +'').split('.');

    this.adultos = Number(pax[0]) || null ;
    this.ninos = Number(pax[1]) || null ;
    this.infantes = Number(pax[2]) || null ;

  }

  update(){

    this.onChange(this.create_pax_list())
  }

  create_pax_list(){

    return [this.adultos||0, this.ninos||0, this.infantes||0].join('.')
  }

}

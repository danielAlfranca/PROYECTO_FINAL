import { Component, OnChanges } from '@angular/core';
import { CustomFieldComponent } from '../model/custom-field.component';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss']
})
export class PassengersListComponent extends CustomFieldComponent implements OnChanges {

  adultos = 0;
  ninos = 0;
  infantes = 0;

  constructor() { super() }

  

  ngOnChanges(): void {

    const pax = this.value || [];

    this.adultos = pax[0] || null ;
    this.ninos = pax[1] || null ;
    this.infantes = pax[2] || null ;

  }

  update(){

    this.onChange(this.create_pax_list())
  }

  create_pax_list(){

    return [this.adultos, this.ninos, this.infantes]
  }

}

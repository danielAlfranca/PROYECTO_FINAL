import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CustomFieldComponent } from '../model/custom-field.component';

@Component({
  selector: 'app-string-array',
  template: "<tag-input [(ngModel)]='value' [editable]='true' placeholder='Añade +' [secondaryPlaceholder]='title' [modelAsStrings]='true' (ngModelChange)='onChange($event)' [addOnBlur]='true' [clearOnBlur]='false'></tag-input>",
  styleUrls: ['./string-array.component.scss']
})
export class StringArrayComponent extends CustomFieldComponent implements OnChanges {

  constructor() { super(); }

  ngOnChanges(){ this.value = (this.value || []).map((e:any)=>e+''); }

  override onChange(arr:any){

    if(Array.isArray(arr)){ this.inputChange.emit(arr.filter(e=>(typeof e == 'string' || typeof e == 'number'  ))); }

  }

}

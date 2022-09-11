import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { CustomFieldComponent } from '../model/custom-field.component';

@Component({
  selector: 'app-item-picker',
  template: `
    <div class="input-group">
      <input type="text" class="form-control" disabled [value]="renderedValue">
      <button class="btn btn-warning"  type="button" (click)="open()"><i class=" bi bi-plus h-3"></i></button>
    </div>
  `,
  styles: ['']
})

export class ItemPickerComponent extends CustomFieldComponent implements OnChanges {

  type!:DataTypes;
  propertyForDisplay!:string
  renderedValue!:string;

  constructor(private appConfig:AppConfigService) { super(); }

  ngOnChanges(changes:SimpleChanges): void{
      
    this.type = this.options.type;
    this.propertyForDisplay = this.options.propertForDisplay || 'nombre';
    this.renderedValue = this.getRenderedValue();
  }

  open(){

    this.appConfig.canvas.open('pop-up-list', {selected:this.value, type:this.type}).pipe(take(1)).subscribe(response=>{

      if(response){ this.onChange(response);  }

    })
  }

  getRenderedValue(){

    if(!this.value) return '';
    
    return this.appConfig.dataConfig.getValue(this.value,this.propertyForDisplay,this.type);

  }


}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { CustomFieldComponent } from '../model/custom-field.component';

@Component({
  selector: 'app-item-picker',
  templateUrl: './item-picker.component.html',
  styleUrls: ['./item-picker.component.scss']
})
export class ItemPickerComponent extends CustomFieldComponent implements OnChanges {

  path!:string;
  type!:DataTypes;
  propertyForDisplay!:string
  renderedValue!:string;

  constructor(private appConfig:AppConfigService) { super(); }

  ngOnChanges(changes: SimpleChanges): void{
      
    this.type = this.options.type;
    this.path = this.options.path || 'pick-'+ this.type ;
    this.propertyForDisplay = this.options.propertForDisplay || 'nombre';
    this.renderedValue = this.getRenderedValue();
  }

  open(){

    this.appConfig.canvas.open(this.path, {selected:this.value, type:this.type}).pipe(take(1)).subscribe(response=>{

      if(response){

        this.onChange(response);
      }

    })
  }

  getRenderedValue(){

    if(!this.value) return '';
    
    const item = this.appConfig.queries.find(this.type,this.value, 'id');

    return this.appConfig.dataConfig.getValue(item,this.propertyForDisplay,this.type)

  }
 


}

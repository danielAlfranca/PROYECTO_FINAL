import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { CustomFieldComponent } from '../model/custom-field.component';

@Component({
  selector: 'app-item-picker',
  template: `
    <div class="input-group">
      <input type="text" disabled class="text-center form-control bg-white" value="{{(item | show:type:propertyForDisplay) || null}} ">
      <span class="input-group-text pointer" (click)="open()"><i class=" bi bi-plus h-3"></i></span>
    </div>
  `,
  styles: ['']
})

export class ItemPickerComponent extends CustomFieldComponent implements OnChanges, OnInit {

  @Input() item:any;
  @Input() type!:DataTypes;
  listType!:DataTypes;
  propertyForDisplay!:string

  constructor(private appConfig:AppConfigService) { super(); }

  ngOnInit(): void {
    
    this.listType = this.options.listType;
    this.propertyForDisplay = this.options.propertyForDisplay;
  }

  ngOnChanges(changes:SimpleChanges): void{ this.item = [...(this.item||[])]; console.log('cambio',changes,(changes['item'] || {}).currentValue)}

  open(){

    this.appConfig.canvas.open('pop-up-list', {selected:this.value, type:this.listType}).pipe(take(1)).subscribe(response=>{

      if(response){ console.log('response',response); this.onChange(response);  }

    })
  }

  /* getRenderedValue(){

    if(!this.value) return '';
    
    return this.appConfig.dataConfig.getValue(this.value,this.propertyForDisplay,this.type);

  }
 */

}

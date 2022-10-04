import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import { CustomFieldComponent } from '../model/custom-field.component';

@Component({
  selector: 'app-item-picker',
  template: `
  <div class="position-relative">
    <div class="form-floating">
      <input type="text" class="form-control bg-transparent"  placeholder="{{title}}" disabled  [value]="(item | show:type:propertyForDisplay) || null" >
      <label>{{title}}</label>   
    </div>
    <button class="position-absolute end-0 btn btn-sm btn-edit btn-warning" (click)="open()"><i class="bi bi-plus h5"></i></button>
  </div>     
  `,
  styles: ['.btn-edit{border-radius:50%; top:-0.5rem}']
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

    this.appConfig.canvas.open(this.get_modal_path(), {selected:this.value, type:this.listType}).pipe(take(1)).subscribe(response=>{

      if(response){ console.log('response',response); this.onChange(response);  }

    })
  }

  get_modal_path(){

    const index = Number(this.appConfig.canvas.currentOutletsIndex.popUp) + 1;

    return  `pop-up-list-${index}`;
  }

}

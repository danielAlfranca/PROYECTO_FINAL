import { Component, OnInit } from '@angular/core';
import { FormAdminComponent } from 'src/app/components/shared/models/form-admin/form-admin.component';
import { reservaForm,reservaForm2 } from 'src/app/fields/reserva';
import { FormItem } from 'src/app/interfaces/form';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { take } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss']
})
export class ReservaFormComponent extends FormAdminComponent implements OnInit {

  fieldsPaquete!:FormItem[]; // for stepform
  step!:number;

  constructor(protected override appConfig:AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init('reserva', reservaForm); }

 override init(type:DataTypes, fields:FormItem[] ): void {
  

    const formData = this.appConfig.canvas.last.query;
    this.fields = fields;
    this.fieldsPaquete = reservaForm2;
    this.item = formData?.formItem || this.appConfig.dataConfig.getModel(type)
    this.step = formData?.editData || 0; 
    this.type = type; 
    
    console.log(this.item);

  }

  setFields(data:any){ // se envian pares de llave/valor

    if(!(data instanceof Event)){ // evitar el error de enviar evento en vez de valor
 
       Object.keys(data).forEach((property:string)=>{        
         
         this.appConfig.dataConfig.setValue(this.item, property, this.type, data[property]);   
       
       });
 
       this.update();  
    }
  }

  update(){

    this.fields.forEach(field=>{

      let names = Array.isArray(field.name) ? field.name:[field.name];

      field.valid = names.every(name=>this.validateField(name))
      
    });

    this.item = [...this.item]; 
    
    console.log(this.item);
  } 

  validateField(name:string){

    return this.appConfig.dataConfig.validateProperty(this.item,name, this.type);
  }

  

}

import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormItem } from 'src/app/interfaces/form';
import { DataTypes } from 'src/app/interfaces/types/data-config';
import { AppConfigService } from 'src/app/services/app-config.service';
import Stepper from 'bs-stepper'

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.scss']
})
export class StepFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() type!:DataTypes;
  @Input() item!:any;
  @Input() fields!:{title:string,fields:FormItem[]}[];
  @Input() active!:any;

  @Output() change = new EventEmitter<{item:any,valid:boolean}>();
  @Output() save = new EventEmitter<{item:any}>();

  stepWidth!:number
  steps!:number;
  btnNames!:string[];

  private stepper!: Stepper;
  private domStepper!: HTMLElement;

  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {    

    this.steps = this.fields.length;
    this.stepWidth = 100/this.steps ;
    this.active = this.active || 1;
    this.btnNames = this.fields.map(e=>'Siguiente');
    this.btnNames[this.btnNames.length-1] = "Guardar";
    
  }

  ngAfterViewInit(): void {
      
    setTimeout(()=>{

      this.domStepper = document.querySelector('#stepper1') as HTMLElement;

      this.stepper = new Stepper(document.querySelector('#stepper1') as Element, {
        linear: false,
        animation: true
      });

     this.stepper.to(this.active);

     this.domStepper.addEventListener('show.bs-stepper', this.stepChange)

     
    })
  }

  update(){
      
    this.change.emit({ 
    
      item:this.item, 
      valid:this.appConfig.dataConfig.validate(this.item,this.type) 

    }); 

  } 


  onSave(item:any){ 
    
    const islast = this.steps == this.active;

    this.item = item;

    if(islast) this.save.emit(this.item); 
    else this.stepper.next();    
  
  }

  stepChange(event:any){  this.active= event.detail.indexStep +1 ; }

  ngOnDestroy(): void {
    
    if(this.domStepper) this.domStepper.removeEventListener('click',this.stepChange,true);
    
  }

}

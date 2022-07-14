import { Injectable } from '@angular/core';
import { ActivationStart, Event, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CanvasConfig, AppSections } from '../interfaces/canvas';

@Injectable({
  providedIn: 'root'
})

export class CanvasService {
  

  public get routesChanges(){ return this._routesChanges as Observable<CanvasConfig[]>; };

  public get last():CanvasConfig{ return [...this.canvasStatus].pop() as CanvasConfig}


  private _routesChanges = new Subject<CanvasConfig[]>();

  private canvasStatus:CanvasConfig[] = [];



  constructor(private router:Router){

    this.router.events.subscribe((event: Event) => {

      if (event instanceof ActivationStart) { 
        
        const data = event.snapshot.data as CanvasConfig;

        if(data.type=='main') this.canvasStatus = [data];

        else this.canvasStatus.push(data);

        this._routesChanges.next(this.canvasStatus);
      } 
      
    });
  }


  public changeSection(section:AppSections){ this.router.navigate([section]); }

  public open(route:string, data:any){ }

  public close(config:CanvasConfig){}


}

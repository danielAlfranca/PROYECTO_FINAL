import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivationEnd, Event, Route, Router, Routes, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CanvasConfig } from '../../interfaces/canvas';
import { Deferred } from './deferred';

@Injectable({
  providedIn: 'root'
})

export class CanvasService {
  

  public get routesChanges(){ return this._routesChanges as Observable<CanvasConfig[]>; };

  public get last():CanvasConfig{ return [...this.canvasStatus].pop() as CanvasConfig}



  private _routesChanges = new Subject<CanvasConfig[]>();

  private canvasStatus:CanvasConfig[] = [];


  private routes!:Routes


  constructor(private router:Router, private location: Location){

    this.initRouteLists();

    this.router.events.subscribe((event: Event) => {

      if (event instanceof ActivationEnd) { 
        
        const newStatus = this.parseRootTree(this.router.parseUrl(this.router.url));

        if(this.isClosing(newStatus)) this.answerLastQuery()

        this.canvasStatus  = newStatus;
        this._routesChanges.next(this.canvasStatus);
      }
          
    });
  }


  public open(data:string){  

    const config = this.getRouteConfig(data);

    if(config) { this.router.navigate([config ]); }    

  }

  public close(data?:any){ 

    const last = this.last;

    console.log(last)

    last._response.data = data; // SE GUARDAN AQUI LOS DATOS QUE LUEGOS SE PASARAN A TRAVES DE LA PROMISE

    this.location.back();

  }

  private initRouteLists(){

    this.routes = (this.router.config).filter((e:Route)=>!e.redirectTo); // TODAS LAS RUTAS MENOS LAS REDIRECCIONES

    this.routes.forEach((route:Route)=>{

      const data = route.data as CanvasConfig;

      data.type = this.getOutletType(route);
      data.path = route.path || ''; 
     
    })
  }

  private parseRootTree(tree:UrlTree){ // PILLA EL URL TREE DEL ROUTER Y LO CONVIERTE EN UN ARRAY DE CANVAS CONFIG

    const outlets = tree.root.children, primary = outlets['primary'].segments[0];

    let route, path, sorted = Object.keys(outlets).sort((a,b)=>a.localeCompare(b));

    return sorted.map(outletName=>{

      path = outlets[outletName].segments[0].path;
      route = this.getPathRoute(path);

      return route?.data as CanvasConfig;

    })
  }


   // METODOS PARA PETICION DE NUEVA RUTA

  private getRouteConfig(path:string){ // CONFIGURA DATOS ASOCIADOS A LA RUTA

    const route = this.getPathRoute(path); 

    if(!route) return false

    const data =  route.data as CanvasConfig;      

    data._response = new Deferred();    

    return {outlets: { [route.outlet|| 'primary']: path}}; 
 
  }

  private getPathRoute(path:string){

    return this.routes.find((e:Route)=>e.path==path);

  }

  private getOutletType(route:Route){

     switch (true) {
      
      case route.outlet?.includes('aside'): return 'aside';
      case route.outlet?.includes('popUp'): return 'popUp';
      default : return 'primary';
     
    }
  }

  // METODOS PARA SUSCRPCION ROUTER EVENTS


  private isClosing(newCanvasStatus:CanvasConfig[]){    

    return newCanvasStatus.length < this.canvasStatus.length; // el nuevo valor tiene menos rutas que el anterior

  }

  private answerLastQuery(){    // responde a la peticion del componente que demanda el canvas

    const data = this.last;

    if(data._response.data) { data._response.resolve(data._response.data)}
    else{ data._response.reject() }

  }


}

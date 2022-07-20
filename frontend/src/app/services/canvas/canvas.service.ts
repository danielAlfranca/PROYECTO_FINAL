import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivationEnd, Event, Route, Router, Routes, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CanvasConfig } from '../../interfaces/canvas';

@Injectable({
  providedIn: 'root'
})

export class CanvasService {  

  public get routesChanges(){ return this._routesChanges as Observable<CanvasConfig[]>; };

  public get last():CanvasConfig{ return [...this.canvasStatus].pop() as CanvasConfig }

  private _routesChanges = new Subject<CanvasConfig[]>();

  public canvasStatus!:CanvasConfig[];

  private routes!:Routes;

  constructor(private router:Router, private location: Location){

    this.initRouteLists();

    this.router.events.subscribe((event: Event) => {

      if (event instanceof ActivationEnd) {  this.update();  }
          
    });
  }


  public open(data:string){  // se solicita la ruta y se devuelve un observable para emitir respuesta

    const response = new Subject<any>(), config = this.getRouteConfig(data, response);

    if(config) { this.router.navigate([config ]); }  
    
    return response as Observable<any>;
  }

  public close(data?:any){ 

    const last = this.last;

    if(last?._response) last._responseData = data; // SE GUARDAN AQUI LOS DATOS QUE LUEGOS SE PASARAN A TRAVES DE LA PROMISE

    this.location.back();

  }

  
  private update(){

    const newStatus = this.parseRootTree(this.router.parseUrl(this.router.url));

    if(!this.canvasStatus) { // AL RECARGAR SE RESETEA A RUTA PRIMARIA  
      
      this.canvasStatus = [];
      this.router.navigateByUrl(newStatus[0].path);      

    }else{

      if(this.isClosing(newStatus)) this.answerLastQuery();

      this.canvasStatus  = newStatus;
      this._routesChanges.next(this.canvasStatus);
    }

  }

  private initRouteLists(){

    this.routes = (this.router.config).filter((e:Route)=>!e.redirectTo); // TODAS LAS RUTAS MENOS LAS REDIRECCIONES

    this.routes.forEach((route:Route)=>{

      const data = route.data as CanvasConfig;

      data.type = this.getOutletType(route);
      data.path = route.path || ''; 
      data.outlet = route.outlet || 'primary'; 
     
    });
  }

  private parseRootTree(tree:UrlTree){ // PILLA EL URL TREE DEL ROUTER Y LO CONVIERTE EN UN ARRAY DE CANVAS CONFIG

    let outlets = tree.root.children, route, path, all, asides, popUps, primary;

    all = Object.keys(outlets).map(outletName=>{

      path = outlets[outletName].segments[0].path;
      route = this.getPathRoute(path);

      return route?.data as CanvasConfig;

    });

    primary = all.find(e=>e.type=='primary') as CanvasConfig;
    asides = all.filter(e=>e.type=='aside').sort((a,b)=>a.outlet>b.outlet ? 1:-1);
    popUps = all.filter(e=>e.type=='popUp').sort((a,b)=>a.outlet>b.outlet ? 1:-1);

    return [
      primary,
      ...asides,
      ...popUps
    ];
  }


   // METODOS PARA PETICION DE NUEVA RUTA

  private getRouteConfig(path:string, response:Subject<any>){ // CONFIGURA DATOS ASOCIADOS A LA RUTA

    const route = this.getPathRoute(path); 

    if(!route) return false

    const data =  route.data as CanvasConfig;      

    data._response = response;    

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

    if(data._response){

       data._response.next(data._responseData||null); data._responseData = null; 

    }
  }


}

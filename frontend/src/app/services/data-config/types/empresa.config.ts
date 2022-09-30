import { Injectable, Injector } from "@angular/core";
import { DataConfig } from "../model";

@Injectable({
    providedIn: 'root' 
  })
export class EmpresaConfig extends DataConfig{
   

    constructor(protected override injector:Injector){ super(injector); }


}
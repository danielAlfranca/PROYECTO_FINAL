import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitGuardService implements CanActivate{

  constructor(private appConfig:AppConfigService){}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {

    let isLoggedIn = this.appConfig.appInit;

    if (isLoggedIn){ return true } else {
      
      this.appConfig.canvas.open('start-session')

      return false
    }
  }
  
}

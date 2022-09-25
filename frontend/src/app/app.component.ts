import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AppConfigService } from './services/app-config.service';

@Component({
  selector: 'app-root',
  template: '<app-layout><router-outlet></router-outlet></app-layout>'
})
export class AppComponent {

  constructor(){}

  
}

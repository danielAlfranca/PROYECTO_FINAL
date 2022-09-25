import { CanActivate } from "@angular/router";


@Injectable({
    providedIn: 'root'
  })

  export class AppInitGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){};
    canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {

        let isLoggedIn = this.appConfig.appInit;
    
        if (isLoggedIn){ return true } else {
          
          this.appConfig.canvas.open('start-session')
    
          return false
        }
      }
    
  }
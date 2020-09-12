import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { GlobalVariablesService } from '../global-variables.service';
import { SubMenus } from './data/submenu-data.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private authenticationService : AuthenticationService,
              private router: Router,
              private globalVariablesService: GlobalVariablesService) { }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot) {
    var urlArray = route.pathFromRoot.filter(v => v.routeConfig).map(v => v.routeConfig!.path)
    var url      = urlArray[0] 
    this.globalVariablesService.enableView    = true
    this.globalVariablesService.enableSave    = false
    this.globalVariablesService.enableDelete  = false

    if (this.authenticationService.isUserLoggedIn()) {
      if(typeof this.globalVariablesService.loggedInUser != 'undefined'
          && this.globalVariablesService.loggedInUser != null){
        let menu : SubMenus[] = this.globalVariablesService.loggedInUser
                        .role.subMenus
                        .filter(menu=> menu.subMenu.menuURL == url)

        if(typeof menu[0] != 'undefined'
            && menu[0] != null){
          this.globalVariablesService.enableView    = menu[0].enableView=='Y'? true:false
          this.globalVariablesService.enableSave    = menu[0].enableSave=='Y'? true:false
          this.globalVariablesService.enableDelete  = menu[0].enableDelete=='Y'? true:false

          console.log(this.globalVariablesService.enableView + '-->' +menu[0].enableView)
          console.log(this.globalVariablesService.enableSave + '-->' +menu[0].enableSave)
          console.log(this.globalVariablesService.enableDelete + '-->' +menu[0].enableDelete)
        }
        
      }
      
      return this.globalVariablesService.enableView;
    } else{
      this.router.navigate(['login']);
      return false;
    }
  }
}

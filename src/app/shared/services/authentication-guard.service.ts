import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardService implements CanActivate {

  constructor() { }

  /**
   * Can activate guard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
    // return this.statusService.checkStatus(state.url).then((data: AuthorizationTypes.User) => {
    //   return this.guardService.passGuard(data);
    // }).catch((error) => {
    //   return this.guardService.failGuard(error);
    // });
  }

}

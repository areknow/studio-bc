import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) { }

  /**
   * Can activate guard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // check auth cookie
    const cookie = false;
    return true;
    // if (!cookie) {
    //   this.router.navigate(['/admin/login']);
    //   return false;
    // } else {
    //   return true;
    // }
    // return this.statusService.checkStatus(state.url).then((data: AuthorizationTypes.User) => {
    //   return this.guardService.passGuard(data);
    // }).catch((error) => {
    //   return this.guardService.failGuard(error);
    // });
  }

}

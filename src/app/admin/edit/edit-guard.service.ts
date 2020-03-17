import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AdminService } from '../admin.service';

@Injectable({
  providedIn: 'root',
})
export class EditGuardService implements CanActivate {

  constructor(private adminService: AdminService) { }

  /**
   * Can activate guard
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const session = coerceBooleanProperty(sessionStorage.getItem('session'));
    if (session) {
      this.adminService.loggedIn = true;
      return true;
    } else if (this.adminService.loggedIn) {
      return true;
    } else {
      this.adminService.login();
      return false;
    }
  }

}

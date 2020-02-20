import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AdminService } from '../admin.service';

@Injectable({
  providedIn: 'root',
})
export class EditGuardService implements CanActivate {

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

  /**
   * Can activate guard
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.adminService.loggedIn) {
      if (this.adminService.isAdmin) {
        return true;
      } else {
        this.router.navigate(['/admin/error']);
      }
    } else {
      this.adminService.login();
      return false;
    }
  }

}

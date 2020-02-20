import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AdminService } from '../admin.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorGuardService implements CanActivate {

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

  /**
   * Can activate guard
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.adminService.loggedIn) {
      this.router.navigate(['/admin']);
      return false;
    } else {
      return true;
    }
  }

}

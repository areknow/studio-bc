import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {

  constructor(
    private router: Router,
    private adminService: AdminService,
    private angularFireAuth: AngularFireAuth,
  ) { }

  /**
   * Can activate guard
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const credentials = await this.angularFireAuth.getRedirectResult();
    if (credentials.user) {
      this.adminService.updateUserData(credentials.user);
      this.adminService.loggedIn = true;
      this.router.navigate(['/admin/edit']);
      sessionStorage.setItem('session', String(true));
    }
    return true;
  }

}

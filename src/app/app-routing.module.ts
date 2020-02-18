import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from './shared/services/admin-guard.service copy';
import { AuthenticationGuardService } from './shared/services/authentication-guard.service';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuardService],
    loadChildren: () => import('./gallery/gallery.module').then((m) => m.GalleryModule),
  },
  {
    path: 'admin',
    canActivate: [AdminGuardService],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

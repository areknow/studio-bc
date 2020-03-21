import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from './admin/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuardService],
    loadChildren: () => import('./gallery/gallery.module').then((m) => m.GalleryModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then((m) => m.InfoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

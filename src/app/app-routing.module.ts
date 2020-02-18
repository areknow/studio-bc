import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from './admin/admin-guard.service';

const routes: Routes = [
  {
    path: '',
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

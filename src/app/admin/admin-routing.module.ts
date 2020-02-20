import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'edit',
      },
      {
        path: 'edit',
        loadChildren: () => import('./edit/edit.module').then((m) => m.EditModule),
      },
      {
        path: 'error',
        loadChildren: () => import('./error/error.module').then((m) => m.ErrorModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

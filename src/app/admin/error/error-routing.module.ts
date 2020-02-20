import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorGuardService } from './error-guard.service';
import { ErrorComponent } from './error.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ErrorGuardService],
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditGuardService } from './edit-guard.service';
import { EditComponent } from './edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [EditGuardService],
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRoutingModule { }

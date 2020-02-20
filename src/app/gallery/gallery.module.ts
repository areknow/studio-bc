import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    RouterModule,
    GalleryRoutingModule
  ]
})
export class GalleryModule { }

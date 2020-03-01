import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavModule } from '../shared/components/nav/nav.module';
import { ImagePipeModule } from '../shared/pipes/image/image.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';

@NgModule({
  declarations: [
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GalleryRoutingModule,
    ImagePipeModule,
    NavModule,
  ],
})
export class GalleryModule { }

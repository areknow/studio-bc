import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { NavModule } from '../shared/components/nav/nav.module';
import { ImagePipeModule } from '../shared/pipes/image/image.module';
import { CaptionPipe } from './caption.pipe';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';

@NgModule({
  declarations: [
    GalleryComponent,
    CaptionPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GalleryRoutingModule,
    ImagePipeModule,
    NavModule,
    LoaderModule,
  ],
})
export class GalleryModule { }

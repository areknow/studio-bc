import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavModule } from '../shared/components/nav/nav.module';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';

@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
    NavModule,
  ],
})
export class InfoModule { }

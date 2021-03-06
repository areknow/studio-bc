import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { ImagePipeModule } from 'src/app/shared/pipes/image/image.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { FileLabelPipe } from './add-dialog/file-label.pipe';
import { EditRoutingModule } from './edit-routing.module';
import { ConfirmDialog, EditComponent } from './edit.component';
import { ItemPipe } from './sort-dialog/item.pipe';
import { SortDialogComponent } from './sort-dialog/sort-dialog.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    EditComponent,
    AddDialogComponent,
    FileLabelPipe,
    UnauthorizedComponent,
    SortDialogComponent,
    ItemPipe,
    ConfirmDialog,
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EditRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSortModule,
    MatCheckboxModule,
    ImagePipeModule,
    LoaderModule,
    DragDropModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class EditModule { }

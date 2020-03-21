import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IDialogData } from 'src/app/shared/types';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {

  uploading = false;
  form: FormGroup;
  valid = true;

  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
  ) {
    this.form = this.formBuilder.group({
      name: [this.data.content.name, Validators.required],
      width: [this.data.content.width, Validators.required],
      height: [this.data.content.height, Validators.required],
      price: [this.data.content.price, Validators.required],
    });
  }

  cancel(): void {
    this.dialogRef.close();
    this.form.reset();
  }

  save(): void {
    this.data.content.name = this.form.value.name;
    this.data.content.width = this.form.value.width;
    this.data.content.height = this.form.value.height;
    this.data.content.price = this.form.value.price;
  }

  async handleFile(type: string, event: any): Promise<void> {
    this.uploading = true;
    const file = event.target.files[0];
    const hash = await this.storageService.uploadFile(file);
    this.data.content[type] = hash;
    this.uploading = false;
  }

}

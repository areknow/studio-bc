import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGalleryItem } from '../edit.component';

export interface IDialogData {
  editing: boolean;
  content: IGalleryItem;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

  uploading = false;
  form: FormGroup;
  valid = true;

  constructor(
    private angularFireStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
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
    const hash = this.generateRandomHash(64);
    await this.angularFireStorage.upload(hash, file);
    this.data.content[type] = hash;
    this.uploading = false;
  }

  generateRandomHash(length: number): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let hash = '';
    for (let i = 0; i <= length; i++) {
      hash += characters[Math.floor(Math.random() * characters.length)];
    }
    return hash;
  }

}

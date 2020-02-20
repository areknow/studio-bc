import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AdminService } from '../admin.service';
import { DialogComponent, IDialogData } from './dialog/dialog.component';

export interface IGalleryItem {
  name: string;
  width: number;
  height: number;
  price: number;
  sold: boolean;
  image: string;
  thumbnail: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  columns = ['name', 'width', 'height', 'price', 'sold', 'image', 'thumbnail', 'edit'];

  private itemsCollection: AngularFirestoreCollection<IGalleryItem>;
  items: Observable<IGalleryItem[]>;

  item: IDialogData = {
    name: '',
    width: null,
    height: null,
  }

  get isAdmin(): boolean {
    return this.adminService.isAdmin;
  }

  constructor(
    private adminService: AdminService,
    private angularFirestore: AngularFirestore,
    public dialog: MatDialog,
  ) {
    this.itemsCollection = this.angularFirestore.collection<IGalleryItem>('gallery');
    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe(m => console.log(m));
  }

  ngOnInit(): void {
  }

  newRow(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: this.item,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.item = result;
    });
  }

  editRow(id: number): void {
    console.log(id);
  }

  logout(): void {
    this.adminService.logout();
  }

}

import { Component, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  date: Date;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {

  @ViewChild(MatSort) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  dataSource = new MatTableDataSource();

  private itemsCollection: AngularFirestoreCollection<IGalleryItem>;
  items$: Observable<IGalleryItem[]>;
  items: IGalleryItem[];

  columns = [
    'name',
    'width',
    'height',
    'price',
    'date',
    'sold',
    'image',
    'thumbnail',
    'actions',
  ];

  dialogData: IGalleryItem = {
    name: null,
    width: null,
    height: null,
    price: null,
    sold: false,
    image: null,
    thumbnail: null,
    date: null,
  };

  get isAdmin(): boolean {
    return this.adminService.isAdmin;
  }

  constructor(
    private adminService: AdminService,
    private angularFirestore: AngularFirestore,
    public dialog: MatDialog,
  ) {
    this.itemsCollection = this.angularFirestore.collection<IGalleryItem>('gallery');
    this.items$ = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as IGalleryItem;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
    this.items$.subscribe(items => {
      this.items = items;
      this.dataSource.data = this.items;
    });
  }

  openModal(type: 'add'|'edit', data: DocumentData, id?: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      width: '400px',
      height: '500px',
      data: {
        editing: type === 'edit',
        content: data,
      },
    });
    dialogRef.afterClosed().subscribe(async (result: IDialogData) => {
      if (result) {
        try {
          if (type === 'add') {
            // Add date before saving
            result.content.date = new Date();
            await this.itemsCollection.add(result.content);
          } else if (type === 'edit') {
            await this.itemsCollection.doc(String(id)).set(result.content);
          }
        } catch (error) {
          console.log(error);
        }
        this.resetForm();
      }
    });
  }

  newRow(): void {
    this.openModal('add', this.dialogData);
  }

  async editRow(id: number): Promise<void> {
    try {
      const doc = await this.itemsCollection.doc(String(id)).ref.get();
      this.openModal('edit', doc.data(), id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRow(id: number): Promise<void> {
    try {
      await this.itemsCollection.doc(String(id)).ref.delete();
    } catch (error) {
      console.log(error);
    }
  }

  logout(): void {
    this.adminService.logout();
  }

  resetForm(): void {
    this.dialogData = {
      name: null,
      width: null,
      height: null,
      price: null,
      sold: false,
      image: null,
      thumbnail: null,
      date: null,
    };
  }

  search(value: string): void {
    if (value) {
      this.dataSource.data = this.items.filter((item: IGalleryItem) => item.name.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.dataSource.data = this.items;
    }
  }

}

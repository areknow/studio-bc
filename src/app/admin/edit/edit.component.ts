import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
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
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {

  columns = [
    'name',
    'width',
    'height',
    'price',
    'sold',
    'image',
    'thumbnail',
    'actions',
  ];

  private itemsCollection: AngularFirestoreCollection<IGalleryItem>;
  items: Observable<IGalleryItem[]>;

  dialogData: IGalleryItem = {
    name: null,
    width: null,
    height: null,
    price: null,
    sold: null,
    image: null,
    thumbnail: null,
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
    this.items = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as IGalleryItem;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  openModal(type: 'add'|'edit', data: DocumentData, id?: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '500px',
      data: {
        editing: type === 'edit',
        content: data,
      },
    });
    dialogRef.afterClosed().subscribe(async (result: IDialogData)  => {
      if (result) {
        try {
          if (type === 'add') {
            await this.itemsCollection.add(result.content);
          } else if (type === 'edit') {
            await this.itemsCollection.doc(String(id)).set(result.content);
          }
        } catch (error) {
          console.log(error);
        }
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

}

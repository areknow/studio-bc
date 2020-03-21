import { Component, ViewChild } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import 'firebase/storage';
import { DocumentService } from 'src/app/shared/services/document.service';
import { IDialogData, IGalleryItem } from 'src/app/shared/types';
import { AdminService } from '../admin.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { SortDialogComponent } from './sort-dialog/sort-dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {

  @ViewChild('table') table: MatTable<IGalleryItem>;

  @ViewChild(MatSort) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  dataSource = new MatTableDataSource<IGalleryItem>();

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
    public dialog: MatDialog,
    private documentService: DocumentService,
  ) {
    this.documentService.gallery$.subscribe(items => {
      this.items = items;
      this.dataSource.data = this.items;
    });
  }

  openSortModal(): void {
    const dialogRef = this.dialog.open(SortDialogComponent, {
      width: '400px',
      height: '800px',
    });
  }

  openAddModal(type: 'add'|'edit', data: DocumentData, id?: string): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
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
            this.documentService.addGalleryItem(result.content);
          } else if (type === 'edit') {
            this.documentService.updateGalleryItem(id, result.content);
          }
        } catch (error) {
          console.log(error);
        }
        this.resetForm();
      }
    });
  }

  newRow(): void {
    this.openAddModal('add', this.dialogData);
  }

  async editRow(id: string): Promise<void> {
    try {
      const doc = await this.documentService.getGalleryItem(id);
      this.openAddModal('edit', doc.data(), id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRow(id: string): Promise<void> {
    try {
      this.documentService.deleteGalleryItem(id);
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

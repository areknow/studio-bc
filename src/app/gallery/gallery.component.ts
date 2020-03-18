import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AdminService } from '../admin/admin.service';
import { IGalleryItem } from '../admin/edit/edit.component';

declare var require: any;

const CHOCOLAT_OPTIONS = {
  fullScreen: null,
  loop: true,
};

const MACY_OPTIONS = {
  container: '.masonry',
  columns: 4,
  trueOrder: false,
  margin: { y: 30, x: 30 },
  breakAt: {
    940: {
      margin: { x: 10, y: 10 },
      columns: 3,
    },
    620: 2,
    370: 1,
  },
};

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {

  private itemsCollection: AngularFirestoreCollection<IGalleryItem>;
  items: IGalleryItem[] = [];
  loading = true;

  get isLoggedIn(): boolean {
    return this.adminService.loggedIn;
  }

  constructor(
    private adminService: AdminService,
    private angularFirestore: AngularFirestore,
  ) {
    this.itemsCollection = this.angularFirestore.collection<IGalleryItem>('gallery');
    this.itemsCollection.valueChanges().subscribe(response => {
      this.items = response;
      setTimeout(() => {
        this.renderGrid();
      }, 0);
    });
  }

  renderGrid(): void {
    const macy = require('macy');
    const masonry = new macy(MACY_OPTIONS);
    $('.masonry').Chocolat(CHOCOLAT_OPTIONS);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';
import { AdminService } from '../admin/admin.service';
import { IGalleryItem } from '../admin/edit/edit.component';

declare var require: any;

const CHOCOLAT_OPTIONS = {
  fullScreen: null,
};

const MACY_OPTIONS = {
  container: '.masonry',
  columns: 5,
  trueOrder: true,
  margin: { y: 30, x: 30 },
  breakAt: {
    1200: 4,
    940: {
      margin: { x: 10, y: 10 },
      columns: 3,
    },
    520: 2,
    400: 1,
  },
};

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<IGalleryItem>;
  items$: Observable<IGalleryItem[]>;
  items: any[];
  loading = true;

  get isLoggedIn(): boolean {
    return this.adminService.loggedIn;
  }

  constructor(
    private adminService: AdminService,
    private angularFirestore: AngularFirestore,
  ) {
    this.itemsCollection = this.angularFirestore.collection<IGalleryItem>('gallery');
    this.items$ = this.itemsCollection.valueChanges();
    this.items$.subscribe(response => {
      this.items = response;
      setTimeout(() => {
        this.renderGrid();
      }, 0);
    });
  }

  ngOnInit(): void { }

  renderGrid(): void {
    const macy = require('macy');
    const masonry = new macy(MACY_OPTIONS);
    $('.masonry').Chocolat(CHOCOLAT_OPTIONS);
  }

}

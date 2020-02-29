import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';
import { AdminService } from '../admin/admin.service';
import { IGalleryItem } from '../admin/edit/edit.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<IGalleryItem>;
  items: Observable<IGalleryItem[]>;

  get isLoggedIn(): boolean {
    return this.adminService.loggedIn;
  }

  constructor(
    private adminService: AdminService,
    private angularFirestore: AngularFirestore,
  ) {
    this.itemsCollection = this.angularFirestore.collection<IGalleryItem>('gallery');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

}

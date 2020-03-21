import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IGalleryItem, IOrder, IOrderEntry } from '../types';

const COLLECTION_SETTINGS = 'settings';
const COLLECTION_GALLERY = 'gallery';
const DOCUMENT_ORDER = 'order';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  private galleryCollection: AngularFirestoreCollection<IGalleryItem>;
  private orderCollection: AngularFirestoreCollection<IOrder>;

  gallery$: Observable<IGalleryItem[]>;
  order$: Observable<IOrder>;

  constructor(private angularFirestore: AngularFirestore) {
    this.galleryCollection = this.angularFirestore.collection<IGalleryItem>(COLLECTION_GALLERY);
    this.getGalleryObservable();
    this.orderCollection = this.angularFirestore.collection<IOrder>(COLLECTION_SETTINGS);
    this.getOrderObservable();
  }

  getGalleryObservable(): void {
    this.gallery$ = this.galleryCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as IGalleryItem;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getGalleryItem(id: string): Promise<DocumentData> {
    return this.galleryCollection.doc(String(id)).ref.get();
  }

  async addGalleryItem(item: IGalleryItem): Promise<void> {
    try {
      const id = (await this.galleryCollection.add(item)).id;
      this.addOrderEntry(id);
    } catch (error) {
      console.log(error);
    }
  }

  async updateGalleryItem(id: string, item: IGalleryItem): Promise<void> {
    try {
      await this.galleryCollection.doc(String(id)).set(item);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteGalleryItem(id: string): Promise<void> {
    try {
      await this.galleryCollection.doc(String(id)).ref.delete();
      this.deleteOrderEntry(id);
    } catch (error) {
      console.log(error);
    }
  }

  getOrderObservable(): void {
    this.order$ = this.orderCollection.doc<IOrder>(DOCUMENT_ORDER).valueChanges();
  }

  async getOrderArray(): Promise<IOrderEntry[]> {
    try {
      return (await this.orderCollection.doc<IOrder>(DOCUMENT_ORDER).valueChanges().pipe(take(1)).toPromise()).value;
    } catch (error) {
      console.log(error);
    }
  }

  async setOrder(order: IOrderEntry[]): Promise<void> {
    try {
      await this.orderCollection.doc(DOCUMENT_ORDER).set({ value: order });
    } catch (error) {
      console.log(error);
    }
  }

  async addOrderEntry(id: string): Promise<void> {
    const order = await this.getOrderArray();
    order.push({ id });
    try {
      await this.orderCollection.doc(DOCUMENT_ORDER).set({ value: order });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOrderEntry(id: string): Promise<void> {
    const order = (await this.getOrderArray()).filter(item => item.id !== id);
    try {
      await this.orderCollection.doc(DOCUMENT_ORDER).set({ value: order });
    } catch (error) {
      console.log(error);
    }
  }

}

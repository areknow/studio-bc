import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface IUser {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  user$: Observable<IUser> = EMPTY;

  loggedIn = false;
  isAdmin = undefined;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.angularFirestore.doc<IUser>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
    this.user$.subscribe(user => {
      if (user) {
        this.isAdmin = user.isAdmin;
      }
    });
  }

  async login(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.angularFireAuth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.loggedIn = true;
    this.router.navigate(['/admin/edit']);
    sessionStorage.setItem('session', String(true));
  }

  async logout(): Promise<void> {
    await this.angularFireAuth.signOut();
    this.loggedIn = false;
    this.router.navigate(['/']);
    sessionStorage.removeItem('session');
  }

  private updateUserData(user: IUser): Promise<void> {
    const userRef: AngularFirestoreDocument<IUser> = this.angularFirestore.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(data, { merge: true });
  }

}

import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';

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
export class AdminService implements OnDestroy {

  user$: Observable<IUser> = EMPTY;

  loggedIn = false;
  isAdmin = undefined;
  photo = '';

  unsubscribe$ = new Subject();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(switchMap(user => {
      if (user) {
        try {
          return this.angularFirestore.doc<IUser>(`users/${user.uid}`).valueChanges();
        } catch (error) {
          console.log(error);
        }
      } else {
        return of(null);
      }
    }));
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      if (user) {
        this.isAdmin = user.isAdmin;
        this.photo = user.photoURL;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async login(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.angularFireAuth.signInWithRedirect(provider);
    } catch (error) {
      console.log(error);
    }
    sessionStorage.setItem('redirect', String(true));
  }

  async logout(): Promise<void> {
    try {
      this.angularFireAuth.signOut();
    } catch (error) {
      console.log(error);
    }
    this.loggedIn = false;
    this.router.navigate(['/']);
    sessionStorage.removeItem('session');
    sessionStorage.removeItem('redirect');
  }

  async updateUserData(user: IUser): Promise<void> {
    try {
      const userRef: AngularFirestoreDocument<IUser> = this.angularFirestore.doc(`users/${user.uid}`);
      const userData = await userRef.valueChanges().pipe(take(1)).toPromise();
      let admin = false;
      if (userData) {
        admin = userData.isAdmin;
      }
      const data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: admin,
      };
      return userRef.set(data, { merge: true });
    } catch (error) {
      console.log(error);
    }
  }

}

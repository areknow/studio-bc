import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor() { }

  googleAuth() {
    console.log('auth method')
  }

}

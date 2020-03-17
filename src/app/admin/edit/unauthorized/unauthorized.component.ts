import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div>
      <img src="/assets/images/security.svg">
    </div>
    <div class="text">
      <h1>Unauthorized</h1>
      <p>You do not have the permissions required to access this page.</p>
      <a mat-stroked-button routerLink="/">Return home</a>
    </div>
  `,
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent { }

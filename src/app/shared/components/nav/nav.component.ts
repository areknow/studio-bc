import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  get isLoggedIn(): boolean {
    return this.adminService.loggedIn;
  }

  get isAdmin(): boolean {
    return this.adminService.isAdmin;
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void { }

}

import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {
    this.authService.authenticate().subscribe({ next: (u) => {
      this.isAdmin = u.admin;
    } });
  }
}

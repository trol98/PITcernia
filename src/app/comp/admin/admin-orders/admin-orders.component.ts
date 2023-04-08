import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  isActive: boolean = false;
  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.isActive = params['active'] === 'true';
    });

  }
}

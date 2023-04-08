import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  id: number = -1;
  constructor(
    private route: ActivatedRoute,
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
}

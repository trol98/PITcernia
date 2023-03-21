import { OrderService } from './../../../order/order.service';
import { Component } from '@angular/core';
import { Order } from 'src/app/order/interfaces/order.interface';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css'],
})
export class ActiveComponent {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {
    this.orderService.getUserOrders(true).subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
      },
      error: () => {},
    });
  }

  displayOrders() {
    return JSON.stringify(this.orders);
  }
}

import { OrderService } from '../../../order/order.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/order/interfaces/order.interface';

@Component({
  selector: 'app-active',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css'],
})
export class UserOrdersComponent {
  orders: Order[] = [];
  isActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.isActive = params['active'];
    });
    this.orderService.getUserOrders(this.isActive).subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
      },
      error: () => {},
    });
  }
  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe({
      next: () => {
        alert(`Order canceled: ${id}`);
        const index = this.orders.findIndex((v) => {
          return v.id == id;
        });
        this.orders.splice(index, 1);
      },
      error: () => {
        alert(`Order cannot be canceled: ${id}`);
      },
    });
  }
  orderTotal(order: Order) {
    let sum = 0;
    order.pizzaToOrder.forEach((elem) => {
      sum += elem.quantity * elem.pizza.price;
    });
    return sum;
  }
}

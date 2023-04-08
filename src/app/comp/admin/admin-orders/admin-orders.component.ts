import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/order/interfaces/order.interface';
import { OrderService } from 'src/app/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent {
  isActive: boolean = false;
  orders: Order[] = [];
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.isActive = params['active'] === 'true';
      this.orderService.getAllOrders(this.isActive).subscribe({
        next: (orders: Order[]) => {
          this.orders = orders;
        },
        error: () => {},
      });
    });
  }

  finishOrder(id: number) {
    this.orderService.finishOrder(id).subscribe({
      next: () => {
        alert(`Order finished: ${id}`);
        const index = this.orders.findIndex((v) => {
          return v.id == id;
        });
        this.orders.splice(index, 1);
      },
      error: () => {
        alert(`Order cannot be finished: ${id}`);
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

  ordersSummary() {
    let sum = 0;
    this.orders.forEach((order) => {
      sum += this.orderTotal(order);
    });
    return sum;
  }
}

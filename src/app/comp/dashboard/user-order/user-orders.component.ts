import { OrderService } from '../../../order/order.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/order/interfaces/order.interface';

@Component({
  selector: 'app-active',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent {
  orders: Order[] = [];
  isActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe((params) => {
      this.isActive = params['active'] === 'true';
      this.orderService.getUserOrders(this.isActive).subscribe({
        next: (orders: Order[]) => {
          this.orders = orders;
        },
        error: () => {},
      });
    });
  }
  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe({
      next: () => {
        this.snackBar.open(`Order ${id} has been canceled`);
        const index = this.orders.findIndex((v) => {
          return v.id == id;
        });
        this.orders.splice(index, 1);
      },
      error: () => {
        this.snackBar.open(`Something went wrong`);
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
    // if an order was canceled don't count it towards the total sum
    // becouse it was refunded
    this.orders
      .filter((order) => {
        return !order.canceled;
      })
      .forEach((order) => {
        sum += this.orderTotal(order);
      });
    return sum;
  }
}

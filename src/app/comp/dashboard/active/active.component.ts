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
      error: () => { },
    });

  }
  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe({
      next: () => {
        alert(`Order canceled: ${id}`);
        const index = this.orders.findIndex((v) => {return v.id == id})
        this.orders.splice(index, 1)
      },
      error: () => {
        alert(`Order cannot be canceled: ${id}`);
      },
    });
  }
  orderTotal(order: Order){
    let sum = 0
    order.pizzaToOrder.forEach((elem) => {
      sum += elem.quantity*elem.pizza.price
    })
    return sum;
  }
}


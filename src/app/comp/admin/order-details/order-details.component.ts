import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/order/interfaces/order.interface';
import { OrderService } from 'src/app/order/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  order: any;
  constructor(
    private route: ActivatedRoute,
    private orderSerice: OrderService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderSerice.getOrder(id).subscribe({
      next: (order: Order) => {
        this.order = order;
      },
      error: () => {},
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

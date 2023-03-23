import { OrderService } from './../../../order/order.service';
import { Component } from '@angular/core';
import { Order } from 'src/app/order/interfaces/order.interface';
import { animation ,transition, style, animate, trigger } from '@angular/animations';

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
  shown = false
  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe({
      next: () => {
        alert(`Order canceled: ${id}`);
        this.shown = true;
      },
      error: () => {
        alert(`Order cannot be canceled: ${id}`);
      },
    });
  }
}

trigger('leave', [
  transition(':leave', [
    animate('500ms', style({opacity: 0}))
  ])
])



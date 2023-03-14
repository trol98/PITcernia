import { OrderService } from './../../order/order.service';
import { Component } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { CartLine } from 'src/app/cart/cartLine.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  lines: CartLine[] = [];
  shipping_info: string = '';
  constructor(
    private cartService: CartService,
    private orderSevice: OrderService
  ) {
    this.lines = this.cartService.getCart();
  }
  private clearCart() {
    this.cartService.clearCart();
    this.lines = [];
  }
  getTotal(): number {
    let total = 0;
    this.lines.forEach((line) => {
      total += line.pizza.price * line.quantity;
    });
    return total;
  }
  order() {
    // TODO: Notify user if order creation was successful
    this.orderSevice.createOrder({
      shipping_address: this.shipping_info,
      pizzaLines: this.lines.map((v) => {
        return { pizzaId: v.pizza.id, quantity: v.quantity };
      }),
    }).subscribe();
    this.clearCart();
  }
}

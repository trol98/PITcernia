import { CartLine } from './../../cart/cartLine.interface';
import { CartService } from './../../cart/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  removeFromCart(delLine: CartLine) {
    this.cartService.delete(delLine.pizza);
    this.lines = this.cartService.getCart();
  }
  clearCart() {
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
  lines: CartLine[] = [];
  constructor(private cartService: CartService) {
    this.lines = this.cartService.getCart();
  }
}

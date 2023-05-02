import { OrderService } from './../../order/order.service';
import { Component } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { CartLine } from 'src/app/cart/cartLine.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private orderSevice: OrderService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.lines = this.cartService.getCart();
    // FIXME: Think about state managment, so to not duplicate the /authenticate API calls
    this.authService.authenticate().subscribe({
      next: (u) => {
        this.shipping_info = u.shipping_address;
      },
    });
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
    this.orderSevice
      .createOrder({
        shipping_address: this.shipping_info,
        pizzaLines: this.lines.map((v) => {
          return { pizzaId: v.pizza.id, quantity: v.quantity };
        }),
      })
      .subscribe({
        // TODO: Change alerts to proper information display
        next: () => {
          this.snackBar.open('Order was placed successfully');
          this.clearCart();
        },
        error: (e) => {
          console.log(e)
          this.snackBar.open('Something went wrong');
        },
      });
  }
  isEmpty(): boolean{
    return this.lines.length == 0;
  }
}

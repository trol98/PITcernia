import { CartLine } from './../../cart/cartLine.interface';
import { CartService } from './../../cart/cart.service';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  displayedColumns: string[];

  @ViewChild(MatTable) table: MatTable<CartLine> = {} as  MatTable<CartLine>;

  removeFromCart(delLine: CartLine) {
    this.cartService.delete(delLine.pizza);
    this.lines = this.cartService.getCart();
    this.table.renderRows();
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
  isMobile: boolean = false;
  constructor(
    private cartService: CartService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.lines = this.cartService.getCart();
    this.displayedColumns = ['name', 'size', 'price', 'quantity', 'delete'];
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isCartEmpty(): boolean {
    return this.lines.length == 0;
  }
}

import { CartLine } from './cartLine.interface';
import { Injectable } from '@angular/core';
import { Pizza } from '../pizza/pizza.interface';

// https://stackoverflow.com/a/61037918
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    this.loadCart();
  }

  lines: CartLine[] = [];

  add(pizza: Pizza) {
    const index = this.getIndex(pizza);

    if (index > -1) {
      this.lines[index].quantity += 1;
    } else {
      this.lines.push({
        pizza,
        quantity: 1,
      });
    }

    this.saveCart();
  }

  getCart(): CartLine[] {
    return this.lines;
  }

  private loadCart() {
    this.lines = JSON.parse(localStorage.getItem('cart_items') ?? '[]') ?? [];
  }

  private saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.lines));
  }

  clearCart() {
    this.lines = [];
    localStorage.removeItem('cart_items');
  }

  delete(pizza: Pizza) {
    const index = this.getIndex(pizza);

    if (index > -1) {
      const count = this.lines[index].quantity--;
      if (count <= 0) {
        this.lines.splice(index, 1);
      }
      this.saveCart();
    }
  }

  private getIndex(pizza: Pizza): number {
    return this.lines.findIndex(line => line.pizza.id == pizza.id);
  }
}

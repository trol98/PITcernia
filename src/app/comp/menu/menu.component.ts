import { SizeFilter } from './interfaces/sizeFilter.interface';
import { ToppingFilter } from './interfaces/toppingFilter.interface';
import { CartService } from './../../cart/cart.service';
import { Router } from '@angular/router';
import { PizzaService } from './../../pizza/pizza.service';
import { Component, EventEmitter } from '@angular/core';
import { Pizza } from 'src/app/pizza/pizza.interface';
import { Topping } from 'src/app/pizza/topping.interface';
import { Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  pizza: Pizza[] = [];

  toppingFilters: ToppingFilter[] = [];
  sizeFilters: SizeFilter[] = [];

  value: number = 20;
  highValue: number = 35;
  manualRefresh: EventEmitter<void> = new EventEmitter<void>();
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 0.1,
  };

  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService,
    private router: Router
  ) {
    this.pizzaService.getPizzas().subscribe({
      next: (data) => {
        this.pizza = data;
      },
      error: (err) => {
        this.pizza = [];
      },
      complete: () => {
        this.sizeFilters = this.pizza
          .map((pizza: Pizza) => {
            return { size: pizza.size, on: false };
          })
          .filter((v, i, s) => s.indexOf(v) === i);
        // const prices: number[] = this.pizza.map((p: Pizza) => p.price);
        // const min = Math.min(...prices);
        // const max = Math.max(...prices);

        this.options = {
          floor: 0,
          ceil: 100,
          step: 1,
        };
        // this.value = min + (max - min) / 3;
        // this.highValue = min + ((max - min) * 2) / 3;
        this.value = 20;
        this.highValue = 80;
      },
    });

    this.pizzaService.getToppings().subscribe({
      next: (data) => {
        this.toppingFilters = data.map((topping: Topping) => {
          return { topping, on: false };
        });
      },
      error: (err) => {
        this.toppingFilters = [];
      },
    });
  }
  searchPizza() {
    const size: string[] = this.sizeFilters
      .filter((filter: SizeFilter) => filter.on)
      .map((filter: SizeFilter) => filter.size);

    const toppings: string[] = this.toppingFilters
      .filter((filter: ToppingFilter) => filter.on)
      .map((filter: ToppingFilter) => filter.topping.name);
    this.pizzaService
      .searchPizza(this.value, this.highValue, size, toppings)
      .subscribe({
        next: (data: Pizza[]) => {
          this.pizza = data;
        },
        error: (e) => {
          this.pizza = [];
        },
      });
  }

  formatToppings(p: Pizza) {
    return p.toppings.map((v) => v.name).join(', ');
  }

  pizzaDetails(pizza: Pizza) {
    this.router.navigateByUrl(`details/${pizza.id}`);
  }

  addToCart(pizza: Pizza) {
    this.cartService.add(pizza);
    this.router.navigateByUrl('/cart');
  }

  // pizza = [
  //   {
  //     id: 1,
  //     name: 'Margherita',
  //     price: 13.55,
  //     vegetarian: 'Yes',
  //     image: '/assets/banner.jpg',
  //     toppings: 'Tomato sauce, mozzarella, basil ',
  //   },
  //   {
  //     id: 2,
  //     name: 'Margherita',
  //     price: 13.55,
  //     vegetarian: 'Yes',
  //     image: '/assets/banner.jpg',
  //     toppings: 'Tomato sauce, mozzarella, basil ',
  //   },
  //   {
  //     id: 3,
  //     name: 'Margherita',
  //     price: 13.55,
  //     vegetarian: 'Yes',
  //     image: '/assets/banner.jpg',
  //     toppings: 'Tomato sauce, mozzarella, basil ',
  //   },
  //   {
  //     id: 4,
  //     name: 'Margherita',
  //     price: 13.55,
  //     vegetarian: 'Yes',
  //     image: '/assets/banner.jpg',
  //     toppings: 'Tomato sauce, mozzarella, basil ',
  //   },
  //   {
  //     id: 5,
  //     name: 'Margherita',
  //     price: 13.55,
  //     vegetarian: 'Yes',
  //     image: '/assets/banner.jpg',
  //     toppings: 'Tomato sauce, mozzarella, basil ',
  //   },
  //   {
  //     id: 6,
  //     name: 'Margherita',
  //     price: 13.55,
  //     vegetarian: 'Yes',
  //     image: '/assets/banner.jpg',
  //     toppings: 'Tomato sauce, mozzarella, basil ',
  //   },
  // ];
}

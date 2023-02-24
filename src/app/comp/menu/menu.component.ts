import { CartService } from './../../cart/cart.service';
import { Router } from '@angular/router';
import { PizzaService } from './../../pizza/pizza.service';
import { Component } from '@angular/core';
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

  toppings: Topping[] = [];
  sizes: string[] = [];

  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService,
    private router: Router
  ) {
    this.pizzaService.getPizzas().subscribe({
      next: (data) => {
        this.pizza = data;
        console.log(this.pizza);
      },
      error: (err) => {
        this.pizza = [];
      },
      complete: () => {
        this.sizes = this.pizza
          .map((pizza: Pizza) => pizza.size)
          .filter((v, i, s) => s.indexOf(v) === i);
      },
    });


    this.pizzaService.getToppings().subscribe({
      next: (data) => {
        this.toppings = data;
      },
      error: (err) => {
        this.toppings = [];
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

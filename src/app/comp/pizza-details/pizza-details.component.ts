import { CartService } from './../../cart/cart.service';
import { PizzaService } from './../../pizza/pizza.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pizza } from 'src/app/pizza/pizza.interface';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css'],
})
export class PizzaDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pizzaService: PizzaService,
    private cartService: CartService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pizzaService.getPizzaDetails(id).subscribe((p) => {
      this.pizza = p;
    });
  }

  pizza: Pizza | null = null;

  
  // pizza: Pizza = {
  //   id: -1,
  //   name: 'No pizza',
  //   description: 'No pizza',
  //   img_path: 'assets/pizza_not_found.png',
  //   price: -1,
  //   size: 'no',
  //   toppings: [],
  // };

  addToCart() {
    if (this.pizza){
    this.cartService.add(this.pizza);
  }
    this.router.navigateByUrl('/cart');
  }
}

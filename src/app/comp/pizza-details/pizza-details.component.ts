import { PizzaService } from './../../pizza/pizza.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from 'src/app/pizza/pizza.interface';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css'],
})
export class PizzaDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pizzaService.getPizzaDetails(id).subscribe({
      next: (pizza: Pizza) => {
        this.pizza = pizza;
        console.log(pizza.toppings);
      },
    });
  }
  pizaaaaa: string[] = ['ala', 'bala'];
  pizza: Pizza = {
    id: -1,
    name: 'No pizza',
    description: 'No pizza',
    img_path: 'assets/pizza_not_found.png',
    price: -1,
    size: 'no',
    toppings: [],
  };
}

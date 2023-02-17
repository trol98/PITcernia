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
  ) {}
  pizza?: Pizza;
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pizzaService.getPizzaDetials(id).subscribe({
      next: (pizza: Pizza) => {
        this.pizza = pizza;
      },
      error: (err) => {
        this.pizza = undefined;
      },
    });
  }
  justForTesting() {
    if (this.pizza) {
      return `${this.pizza.name} ${this.pizza.id}`;
    }
    return '';
  }
}

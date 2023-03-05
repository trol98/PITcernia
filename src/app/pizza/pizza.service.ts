import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pizza } from './pizza.interface';
import { Topping } from './topping.interface';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(private http: HttpClient) {}
  HOST: string = environment.HOST;

  getToppings() {
    const url = this.HOST + '/pizza/toppings';
    return this.http.get<Topping[]>(url);
  }

  getPizzas() {
    const url = this.HOST + '/pizza';
    return this.http.get<Pizza[]>(url);
  }

  getPizzaDetails(id: number) {
    const url = this.HOST + `/pizza/${id}`;
    return this.http.get<Pizza>(url);
  }

  searchPizza(min: number, max: number, sizes: string[], toppings: string[]) {
    let url = this.HOST + `/pizza/search?`;

    // generate the url encoding
    url += `minPrice=${min}`;
    toppings.forEach((topping) => {
      url += `&toppings[]=${topping}`;
    });
    sizes.forEach((size) => {
      url += `&sizes[]=${size}`;
    });
    url += `&maxPrice=${max}`;

    return this.http.get<Pizza[]>(url);
  }
}

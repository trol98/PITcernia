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

  // TODO: implement a method for getting pizza info,for the "po wybraniu pizzy..." requirement
  getPizzaDetials(id: number) {
    throw new Error('Method not implemented.');
  }
  // TODO: implement a method for filtering pizza by size, toppings, prize
  // for the "możliwe jest wyszukwianie ..." requirements
  searchPizza() {
    throw new Error('Method not implemented.');
  }
}

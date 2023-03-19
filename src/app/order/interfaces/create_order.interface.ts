import { PizzaLine } from './pizza_line.interface';

export interface CreateOrder {
  shipping_address: string;
  pizzaLines: PizzaLine[];
}

import { PizzaLine } from "./pizza_line.interface";

export interface Order {
  shipping_address: string;
  pizzaLines: PizzaLine[];
}

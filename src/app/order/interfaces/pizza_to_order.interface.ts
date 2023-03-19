import { Pizza } from './../../pizza/pizza.interface';

export interface PizzaToOrder {
  id: number,
  quantity: number;
  orderId: number;
  pizzaId: number;
  pizza: Pizza
}
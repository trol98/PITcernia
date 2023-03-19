import { PizzaToOrder } from './pizza_to_order.interface';

export interface Order {
  id: number;
  userId: number;
  order_date: Date;
  shipping_address: string;
  finished: boolean;
  canceled: boolean;
  pizzaToOrder: PizzaToOrder[];
}

import { User } from 'src/app/auth/interface/user.interface';
import { PizzaToOrder } from './pizza_to_order.interface';

export interface Order {
  id: number;
  userId: number;
  user: User;
  order_date: Date;
  shipping_address: string;
  finished: boolean;
  canceled: boolean;
  pizzaToOrder: PizzaToOrder[];
}

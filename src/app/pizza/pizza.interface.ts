import { Topping } from "./topping.interface";

export interface Pizza {
  description: string;
  id: number;
  img_path: string;
  name: string;
  price: number;
  size: string;
  toppings: Topping[];
}

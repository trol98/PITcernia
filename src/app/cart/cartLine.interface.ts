import { Pizza } from "../pizza/pizza.interface";

export interface CartLine {
  pizza: Pizza;
  quantity: number;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateOrder } from './interfaces/create_order.interface';
import { Order } from './interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  HOST: string = environment.HOST;

  createOrder(body: CreateOrder) {
    const url = this.HOST + '/orders/create';
    const options = { withCredentials: true };
    return this.http.post(url, body, options);
  }

  getUserOrders(isActive: boolean) {
    const url = this.HOST + `/orders?isActive=${isActive}`;
    const options = { withCredentials: true };
    return this.http.get<Order[]>(url, options);
  }
}

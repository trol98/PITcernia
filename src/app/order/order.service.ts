import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from './order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  HOST: string = environment.HOST;

  createOrder(body: Order) {
    const url = this.HOST + '/orders/create';
    const options = {withCredentials: true };
    return this.http.post(url, body, options);
  }
}

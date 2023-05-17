import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/order/interfaces/order.interface';
import { OrderService } from 'src/app/order/order.service';

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { DateFilter } from './interfaces/dateFilter.interface';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent {
  isActive: boolean = false;
  after: Date = new Date();
  before: Date = new Date();
  dateForm: FormGroup;

  dateFilter: DateFilter[] = [
    { name: 'Today', on: true, id: 'today' },
    { name: 'This month', on: false, id: 'month' },
    { name: 'Last 12 months', on: false, id: 'year' },
  ];

  orders: Order[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  displayedOrders$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  dataSource = new MatTableDataSource<Order>();

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe((params) => {
      this.isActive = params['active'] === 'true';
      this.refreshOrders();
    });
    this.dateForm = formBuilder.group({
      date: [Validators.required],
    });
  }

  // FIXME: Ugly hack, fix ASAP
  ngAfterViewInit() {
    const elem: HTMLInputElement = document.querySelector(
      '#size-button-today'
    ) as HTMLInputElement;
    elem.checked = true;
  }

  finishOrder(id: number) {
    this.orderService.finishOrder(id).subscribe({
      next: () => {
        this.snackBar.open(`Order finished: ${id}`);
        const index = this.orders.findIndex((v) => {
          return v.id == id;
        });
        this.orders.splice(index, 1);
      },
      error: () => {
        this.snackBar.open(`Something went wrong`);
      },
    });
  }
  orderTotal(order: Order) {
    let sum = 0;
    order.pizzaToOrder.forEach((elem) => {
      sum += elem.quantity * elem.pizza.price;
    });
    return sum;
  }

  ordersSummary() {
    let sum = 0;
    this.orders.forEach((order) => {
      sum += this.orderTotal(order);
    });
    return sum;
  }
  refreshOrders() {
    console.log(`After: ${this.after}`);
    console.log(`Before: ${this.before}`);

    this.orderService
      .getAllOrders(
        this.isActive,
        // FIXME: Ugly hack, fix ASAP
        // https://github.com/angular/angular/issues/8203
        this.after instanceof Date ? this.after : new Date(this.after),
        this.before instanceof Date ? this.before : new Date(this.before)
      )
      .subscribe({
        next: (orders: Order[]) => {
          this.orders = orders;
          this.dataSource = new MatTableDataSource<any>(this.orders);
          this.dataSource.paginator = this.paginator;
          this.displayedOrders$ = this.dataSource.connect();
        },
      });
  }
  filterDate() {
    const filterChoosen = this.dateForm.value.date;
    switch (filterChoosen) {
      case 'today':
        const date = new Date();
        this.after = date;
        this.before = date;
        break;
      case 'month':
        const currentDate = new Date();
        const firstDay = this.getFirstDayOfMonth(
          currentDate.getFullYear(),
          currentDate.getMonth()
        );
        const lastDay = this.getLastDayOfMonth(
          currentDate.getFullYear(),
          currentDate.getMonth()
        );
        this.after = firstDay;
        this.before = lastDay;
        break;
      case 'year':
        const cDate = new Date();
        const twelveMonthAgo = new Date(
          cDate.getFullYear() - 1,
          cDate.getMonth(),
          cDate.getDate()
        );

        this.after = twelveMonthAgo;
        this.before = cDate;
        break;
    }

    this.refreshOrders();
  }

  getLastDayOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0);
  }
  getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
  }

  isEmpty(): boolean {
    return this.orders.length == 0;
  }
}

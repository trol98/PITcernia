import { NgModule } from '@angular/core';
import { ConfirmComponent } from './comp/confirm/confirm.component';
import { ProfileComponent } from './comp/dashboard/profile/profile.component';
import { CheckoutComponent } from './comp/checkout/checkout.component';
import { PizzaDetailsComponent } from './comp/pizza-details/pizza-details.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './comp/notfound/notfound.component';
import { DashboardComponent } from './comp/dashboard/dashboard.component';
import { LoginComponent } from './comp/login/login.component';
import { CartComponent } from './comp/cart/cart.component';
import { HomeComponent } from './comp/home/home.component';
import { MenuComponent } from './comp/menu/menu.component';
import { NavComponent } from './comp/nav/nav.component';
import { RegisterComponent } from './comp/register/register.component';
import { AboutComponent } from './comp/about/about.component';
import { AuthGuard } from './auth/guards/authGuard.guard';
import { AdminGuard } from './auth/guards/adminGuard.guard';
import { AdminComponent } from './comp/admin/admin.component';
import { UserOrdersComponent } from './comp/dashboard/user-order/user-orders.component';
import { AdminOrdersComponent } from './comp/admin/admin-orders/admin-orders.component';
import { OrderDetailsComponent } from './comp/admin/order-details/order-details.component';
import { ResetComponent } from './comp/reset/reset.component';
import { ForgotComponent } from './comp/forgot/forgot.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'orders',
        component: UserOrdersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'orders',
        component: AdminOrdersComponent,
      },
      {
        path: 'order/details/:id',
        component: OrderDetailsComponent,
      },
    ],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'details/:id', component: PizzaDetailsComponent },
  { path: 'nav', component: NavComponent },
  { path: 'cart', component: CartComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  // refer to FIXME in nav.component.ts
  // { onSameUrlNavigation: 'reload' }
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { PizzaDetailsComponent } from './comp/pizza-details/pizza-details.component';
import { AuthModule } from './auth/auth.module';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './comp/register/register.component';
import { NavComponent } from './comp/nav/nav.component';
import { CartComponent } from './comp/cart/cart.component';
import { MenuComponent } from './comp/menu/menu.component';
import { HomeComponent } from './comp/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './comp/login/login.component';
import { AboutComponent } from './comp/about/about.component';
import { FooterComponent } from './comp/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DashboardComponent } from './comp/dashboard/dashboard.component';
import { NotfoundComponent } from './comp/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSliderModule } from 'ngx-slider-v2';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './comp/checkout/checkout.component';
import { ProfileComponent } from './comp/dashboard/profile/profile.component';
import { ConfirmComponent } from './comp/confirm/confirm.component';
import { AdminComponent } from './comp/admin/admin.component';
import { UserOrdersComponent } from './comp/dashboard/user-order/user-orders.component';
import { AdminOrdersComponent } from './comp/admin/admin-orders/admin-orders.component';
import { OrderDetailsComponent } from './comp/admin/order-details/order-details.component';
import { ResetComponent } from './comp/reset/reset.component';
import { ForgotComponent } from './comp/forgot/forgot.component';
import { MaterialModule } from './material/material.module';
import { DialogComponent } from './comp/dialog/dialog.component';
import { httpInterceptorProviders } from './auth/interceptors/http.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavComponent,
    CartComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    FooterComponent,
    DashboardComponent,
    NotfoundComponent,
    PizzaDetailsComponent,
    CheckoutComponent,
    UserOrdersComponent,
    ProfileComponent,
    ConfirmComponent,
    AdminComponent,
    AdminOrdersComponent,
    OrderDetailsComponent,
    ResetComponent,
    ForgotComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    CarouselModule,
    FontAwesomeModule,
    FormsModule,
    NgxSliderModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

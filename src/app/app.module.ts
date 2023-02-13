import { NgModule, isDevMode } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

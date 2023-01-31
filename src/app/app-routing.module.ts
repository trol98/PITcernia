import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './comp/nav/nav.component';
import { RegisterComponent } from './comp/register/register.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'nav', component: NavComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

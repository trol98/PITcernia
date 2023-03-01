import { AuthGuard } from './guards/authGuard.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthGuard]
})
export class AuthModule { }

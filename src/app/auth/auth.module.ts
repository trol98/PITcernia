import { AuthGuard } from './guards/authGuard.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from './guards/adminGuard.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthGuard, AdminGuard]
})
export class AuthModule { }

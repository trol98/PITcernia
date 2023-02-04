import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RegisterUser } from './registerUser.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  isUserLoggedIn: boolean = false;

  register(registerUser: RegisterUser) {
    // move url to env
    this.http
      .post('http://localhost:3000/auth/register/', JSON.stringify(registerUser))
      .subscribe((data) => {
        console.log(data);
      });
  }
  login(): void {
    this.isUserLoggedIn = false;
    // create cookie
  }

  logout(): void {
    this.isUserLoggedIn = false;
    // remove cookie
  }
}

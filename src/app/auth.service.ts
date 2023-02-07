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
  registrationFailed: boolean = true;
  register(registerUser: RegisterUser) {
    const url = 'http://localhost:3000/auth/register/';
    // const url2 = 'https://httpbin.org/post'

    this.http.post<any>(url, registerUser).subscribe((data) => {
      if (data.error !== null){
        this.registrationFailed = false; 
        return true;
      }
      this.registrationFailed = true;
      return false;
    });
    // const headers = { 'My-Custom-Header': 'foobar' };
    // this.http
    //   .post<any>(url, registerUser, { headers })
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }
  login(): void {
    // fetch JWT token needed
    this.isUserLoggedIn = true;
    // create cookie
  }

  logout(): void {
    this.isUserLoggedIn = false;
    // remove cookie
  }
}

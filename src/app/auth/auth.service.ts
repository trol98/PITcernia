import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from './registerUser.interface';
import { LoginUser } from './loginUser.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isUserLoggedIn: boolean = false;
  registrationFailed: boolean = true;
  loginFailed: boolean = true;

  register(registerUser: RegisterUser) {
    const url = 'http://localhost:3000/auth/register/';
    // const url2 = 'https://httpbin.org/post'

    this.http.post<any>(url, registerUser).subscribe((res) => {
      if (res.error !== null) {
        this.registrationFailed = false;
        return true;
      }
      this.registrationFailed = true;
      return false;
    });
  }

  // const headers = { 'My-Custom-Header': 'foobar' };
  // this.http
  //   .post<any>(url, registerUser, { headers })
  //   .subscribe((data) => {
  //     console.log(data);
  //   });

  login(loginUser: LoginUser): void {
    const url = 'http://localhost:3000/auth/log-in/';
    const options = { observe: 'response' as 'body' };

    this.http.post<any>(url, loginUser, options).subscribe((res) => {
      if (res.error !== null) {
        console.log(res.headers.keys());
      } else {
        // handle error
      }
    });

    this.isUserLoggedIn = true;
    // create cookie
  }

  logout(): void {
    this.isUserLoggedIn = false;
    // remove cookie
  }
}

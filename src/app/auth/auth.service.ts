import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from './registerUser.interface';
import { LoginUser } from './interface/loginUser.interface';
import { Observable } from 'rxjs';
import { User } from './interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  HOST: string = environment.HOST;

  register(registerUser: RegisterUser): Observable<User> {
    const url = this.HOST + '/auth/register';
    return this.http.post<User>(url, registerUser)
  }

  login(loginUser: LoginUser): Observable<User> {
    const url = this.HOST + '/auth/log-in';
    const options = {withCredentials: true };
    return this.http.post<User>(url, loginUser, options);
  }

  logout(): Observable<any> {
    console.log("Hello");
    const url = this.HOST + '/auth/log-out';
    const options = { withCredentials: true };
    return this.http.post<any>(url, {}, options);
  }

  authenticate(): Observable<User> {
    const url = this.HOST + '/auth';
    const options = {withCredentials: true };

    return this.http.get<User>(url, options)
  }
}

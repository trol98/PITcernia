import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from './registerUser.interface';
import { LoginUser } from './loginUser.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  HOST: string = 'http://localhost:3000';

  register(registerUser: RegisterUser): Observable<any> {
    const url = this.HOST + '/auth/register';
    return this.http.post<any>(url, registerUser)
  }

  login(loginUser: LoginUser): Observable<any> {
    const url = this.HOST + '/auth/log-in';
    const options = { observe: 'response' as 'body', withCredentials: true };
    return this.http.post<any>(url, loginUser, options);
  }

  logout(): Observable<any> {
    const url = this.HOST + '/auth/log-out';
    const options = { observe: 'response' as 'body', withCredentials: true };
    return this.http.post<any>(url, options);
  }

  authenticate(): Observable<any> {
    const url = this.HOST + '/auth';
    const options = { observe: 'response' as 'body', withCredentials: true };

    return this.http.get<any>(url, options)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from './registerUser.interface';
import { LoginUser } from './loginUser.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errorMsg: string = '';
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  HOST: string = 'http://localhost:3000';
  registrationFailed: boolean = true;

  register(registerUser: RegisterUser) {
    const url = this.HOST + '/auth/register';

    this.http.post<any>(url, registerUser).subscribe((res) => {
      this.registrationFailed = res.ok;
      return this.registrationFailed;
    });
  }

  async login(loginUser: LoginUser): Promise<void> {
    const url = this.HOST + '/auth/log-in';
    const options = { observe: 'response' as 'body', withCredentials: true };
    this.http.post<any>(url, loginUser, options).subscribe((res) => {});
    console.log(4);
  }

  logout(): void {
    const url = this.HOST + '/auth/log-out';
    const options = { observe: 'response' as 'body', withCredentials: true };

    this.http.post<any>(url, options).subscribe((res) => {});
  }

  authenticate(): string {
    const url = this.HOST + '/auth';
    const options = { observe: 'response' as 'body', withCredentials: true };

    this.http.get<any>(url, options).subscribe((res) => {
      if (res) {
        return JSON.stringify(res);
      }
      return '';
    });
    return '';
  }

  isLogedIn(): boolean{
    return this.cookieService.get('Authentication') !== '';
  }
}

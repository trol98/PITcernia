import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient) {}
  HOST: string = environment.HOST;

  resetPassword(token: string, password: string) {
    const url = this.HOST + `/password/reset`;
    const body = { token, password };
    return this.http.post(url, body);
  }
}

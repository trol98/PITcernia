import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}
  HOST: string = environment.HOST;

  confirmEmail(token: string) {
    const url = this.HOST + `/email-confirmation/confirm/?token=${token}`;
    return this.http.post(url, {});
  }
}

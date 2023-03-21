import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  HOST: string = environment.HOST;

  changeCredentials(newEmail: string, newLogin: string) {
    const url = this.HOST + `/user/update`;
    const options = { withCredentials: true };

    return this.http.put(url, { newEmail, newLogin }, options);
  }

  deleteAccount() {
    const url = this.HOST + `/user/delete`;
    const options = { withCredentials: true };

    return this.http.put(url, {}, options);
  }
}

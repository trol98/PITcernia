import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  HOST: string = environment.HOST;

  changeCredentials(
    newEmail?: string,
    newLogin?: string,
    shipping_address?: string
  ) {
    const url = this.HOST + `/user/update`;
    const options = { withCredentials: true };

    return this.http.put(
      url,
      { newEmail, newLogin, shipping_address },
      options
    );
  }

  changePassword(old_password: string, password: string) {
    const url = this.HOST + `/password/change`;
    const options = { withCredentials: true };

    return this.http.put(
      url,
      { old_password, password },
      options
    );
  }

  deleteAccount() {
    const url = this.HOST + `/user/delete`;
    const options = { withCredentials: true };

    return this.http.put(url, {}, options);
  }
}

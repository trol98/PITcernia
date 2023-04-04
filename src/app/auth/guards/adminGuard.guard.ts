import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { User } from './../interface/user.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): Observable<boolean> {
    return this.auth.authenticate().pipe(
      map((u: User) => {
        if (u.admin) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

import { User } from '../../auth/interface/user.interface';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from './../../auth/storage.service';
import { Component } from '@angular/core';
import {
  faDoorOpen,
  faGripHorizontal,
  faRightToBracket,
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // };
    this.authService.authenticate().subscribe({
      next: (user: User) => {
        this.username = user.login;
      },
      error: () => {
        this.username = 'Guest';
      },
    });
  }
  faRightToBracket = faRightToBracket;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faGripHorizontal = faGripHorizontal;
  faDoorOpen = faDoorOpen;

  username = 'Guest';

  isLoggedIn() {
    // TODO: Consider making an authorization call to backend
    // TODO: Consider additionally clearing the storageService,
    // and doing force logout
    return this.storageService.isLoggedIn();
  }
  logout() {
    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this.storageService.clean();
          this.router.navigateByUrl('/home');
          // FIXME: Totally non-angularish way of refreshing
          // A work around for the username, not refreshing after logging out
          window.location.reload();
        })
      )
      .subscribe();
  }
}

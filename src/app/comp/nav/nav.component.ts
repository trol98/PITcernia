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

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}
  faRightToBracket = faRightToBracket;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faGripHorizontal = faGripHorizontal;
  faDoorOpen = faDoorOpen;

  username = 'user';

  isLoggedIn() {
    // TODO: Consider making an authorization call to backend
    // TODO: Consider additionally clearing the storageService,
    // and doing force logout
    return this.storageService.isLoggedIn();
  }
  logout() {
    // TODO: Implement an mechanism that doesn't allow further use of
    // Authorization cookie
    this.storageService.clean();
  }
}

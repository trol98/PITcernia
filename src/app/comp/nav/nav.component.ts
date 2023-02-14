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
  constructor(private storageService: StorageService, private router: Router) {}
  faRightToBracket = faRightToBracket;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faGripHorizontal = faGripHorizontal;
  faDoorOpen = faDoorOpen;

  isLoggedIn() {
    return this.storageService.isLoggedIn();
  }
  logout() {
    // TODO: Implement an mechanism that doesn't allow further use of
    // Authorization cookie
    this.storageService.clean();
    this.router.navigateByUrl('/home');
  }
}

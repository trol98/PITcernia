import { Component } from '@angular/core';
import { faRightToBracket, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  faRightToBracket = faRightToBracket;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
}

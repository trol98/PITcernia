import { Router } from '@angular/router';
import { UserService } from './../../../user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  accountForm: FormGroup;
  passwordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.accountForm = this.formBuilder.group({
      login: [''],
      email: ['', [Validators.email]],
      shipping_address: ['']
    });

    this.passwordForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      old_password_repeat: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onCredentailsChange() {
    let { login, email, shipping_address } = this.accountForm.value;
    if (!login){
      login = undefined
    }
    if (!email){
      email = undefined
    }
    if (!shipping_address){
      shipping_address = undefined
    }
  
    this.userService.changeCredentials(email, login, shipping_address).subscribe({
      // FIXME: Instead of simplistic alerts, implement a real
      // UI for displaying errors
      next: () => {
        alert('DEBUG: successful');
      },
      error: () => {
        alert('DEBUG: error');
      },
    });
    // TODO: Refresh navbar so that the new username display's correctly
    // TODO: Refresh session storage so that the info in there is correct
  }
  onPasswordChange() {
    let { old_password, old_password_repeat, password } = this.passwordForm.value;
  
    // FIXME: Instead of simplistic alerts, implement a real
    // UI for displaying errorsF
    if (old_password != old_password_repeat){
      alert('DEBUG: Old passwords do not match');
    }
    else {
      this.userService.changePassword(old_password, password).subscribe({
        // FIXME: Instead of simplistic alerts, implement a real
        // UI for displaying errors
        next: () => {
          alert('DEBUG: successful');
        },
        error: () => {
          alert('DEBUG: error');
        },
      });
    }
  }

  deleteAccount() {
    this.userService.deleteAccount().subscribe({
      next: () => {
        alert('Account has been deleted successfully');
      },
      error: (error) => {
        alert('Account has not been deleted successfully');
      },
    });
  }
}

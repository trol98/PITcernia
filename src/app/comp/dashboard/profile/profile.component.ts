import { Router } from '@angular/router';
import { UserService } from './../../../user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  credentialsForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      login: [''],
      email: ['', [Validators.email]],
      shipping_address: ['']
    });
  }
  onCredentailsChange() {
    let { login, email, shipping_address } = this.credentialsForm.value;
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

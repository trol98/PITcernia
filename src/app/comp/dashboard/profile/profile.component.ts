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
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onCredentailsChange() {
    const { login, email } = this.credentialsForm.value;
    this.userService.changeCredentials(email, login).subscribe({
      // FIXME: Instead of simplistic alerts, implement a real 
      // UI for displaying errors
      next: () => {
        alert("DEBUG: successful");
      },
      error: () => {
        alert("DEBUG: error");
      },
    });
    // TODO: Refresh navbar so that the new username display's correctly
    // TODO: Refresh session storage so that the info in there is correct
  }
}

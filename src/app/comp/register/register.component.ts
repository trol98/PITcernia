import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userForm: any;

  registrationFailed: boolean = false;
  attemptedRegistration: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.attemptedRegistration = true;
    if (this.userForm.valid) {
      this.registrationFailed = false;
      const { login, email, password } = this.userForm.value;
      this.authService
        .register({
          login,
          email,
          password,
        })
        .subscribe({
          next: () => {
            this.registrationFailed = false;
          },
          error: (err) => {
            this.registrationFailed = true;
            this.errorMessage = err.error.message;
          },
        });
    } else {
      this.registrationFailed = true;
      this.errorMessage = "The form is not valid";
    }
  }
}

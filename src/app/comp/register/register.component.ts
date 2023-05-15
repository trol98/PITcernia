import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  hidePass: boolean = false;

  // registrationFailed: boolean = false;
  // attemptedRegistration: boolean = false;
  // errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registrationForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  onSubmit() {

    const { login, email, password } = this.registrationForm.value;
    this.authService
      .register({
        login,
        email,
        password,
      })
      .subscribe({
        next: () => {
          this.snackBar.open('Success, a confirmation link was sent');
        },
        error: (err) => {
          // TODO: Check if not too much information is given to the user
          this.snackBar.open(err.error.message);
        },
      });
  }
  /* Handle form errors in Angular */
  public errorHandling = (control: string, error: string) => {
    return this.registrationForm.controls[control].hasError(error);
  };
}

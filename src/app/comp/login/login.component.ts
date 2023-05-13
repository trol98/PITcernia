import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from './../../auth/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePass: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar

  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    if(this.storageService.isLoggedIn()){
      this.router.navigateByUrl("/dashboard/orders?active=true");
    }
  }

  onSubmit() {
      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (data) => {
          this.storageService.saveUser(data);
          this.snackBar.open("Success");
          this.reloadPage();
        },
        error: (err) => {
          // TODO: Check if not too much information is given to the user
          this.snackBar.open(err.error.message);
        },
      });
  }
  reloadPage(): void {
    window.location.reload();
  }

  /* Handle form errors in Angular */
  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  };
}

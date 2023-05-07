import { StorageService } from './../../auth/storage.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userForm: any;

  loginFailed: boolean = false;
  attemptedLogin: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    if(this.storageService.isLoggedIn()){
      this.router.navigateByUrl("/dashboard/orders?active=true");
    }
  }
  onSubmit() {
    this.attemptedLogin = true;
    if (this.userForm.valid) {
      this.loginFailed = false;
      const { email, password } = this.userForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (data) => {
          this.storageService.saveUser(data);
          this.loginFailed = false;
          this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.loginFailed = true;
        },
      });
    } else {
      this.loginFailed = true;
      this.errorMessage = "The form is not valid";
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}

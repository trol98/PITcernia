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

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    if(this.storageService.isLoggedIn()){
      this.router.navigateByUrl("/dashboard");
    }
  }
  async onSubmit() {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (data) => {
          this.storageService.saveUser(data.body);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        },
      });
    } else {
      this.errorMessage = "The form is not valid";
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}

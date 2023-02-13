import { StorageService } from './../../auth/storage.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

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
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  async onSubmit() {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (data) => {
          this.storageService.saveUser(data);

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
      alert('User form is not valid!!');
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}

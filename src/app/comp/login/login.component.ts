import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm: any;
  loginFailed: boolean = false;
  attemptedLogin: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.attemptedLogin = true;
    if (this.userForm.valid) {
      this.authService.login({
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      });
      this.loginFailed = this.authService.loginFailed;
    } else {
      alert('User form is not valid!!');
    }
  }
}

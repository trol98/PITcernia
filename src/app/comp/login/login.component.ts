import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

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
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.attemptedLogin = true;
    if (this.userForm.valid) {
      this.authService.register({
        login: this.userForm.value.login,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        active: false,
        verified: false,
        admin: false,
      });
      this.loginFailed = this.authService.loginFailed;
    } else {
      alert('User form is not valid!!');
    }
    // Remove this on production
    console.log(this.userForm.value);
  }
}

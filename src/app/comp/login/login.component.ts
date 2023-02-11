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
  isLogedIn: boolean = false;
  attemptedLogin: boolean = false;
  counter = 0
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
  async onSubmit() {
    this.attemptedLogin = true;
    if (this.userForm.valid) {
      console.log('1');
      await this.authService.login({
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      });
      console.log('2');
      // console.log("BEFORE: " + this.isLogedIn);
      this.isLogedIn = this.authService.isLogedIn();
      // console.log("AFTER: " + this.isLogedIn);
      // console.log(this.authService.authenticate());
    } else {
      alert('User form is not valid!!');
    }
    // console.log(this.attemptedLogin)
    // console.log(this.isLogedIn)
    this.counter++;
  }
}

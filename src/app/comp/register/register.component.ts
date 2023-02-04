import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userForm: any;
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
    if (this.userForm.valid) {
      this.authService.register({
        login: this.userForm.value.login,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        active: false,
        verified: false,
        admin: false,
      });
    } else {
      alert('User form is not valid!!');
    }
    // Remove this on production
    console.log(this.userForm.value);
  }
}

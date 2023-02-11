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
      this.authService.register({
        login: this.userForm.value.login,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        active: false,
        verified: false,
        admin: false,
      });
      this.registrationFailed = this.authService.registrationFailed;
    } else {
      alert('User form is not valid!!');
    }
  }
}

import { PasswordService } from './../../password/password.service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  passwordForm: FormGroup;
  token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private passwordService: PasswordService
  ) {
    this.passwordForm = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          // new FormControl(
          //   'Password too weak',
          //   Validators.pattern(
          //     /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
          //   )
          // ),
        ],
      ],
      repeatPassword: ['', [Validators.required]],
    });

    this.passwordForm.addValidators([
      this.createCompareValidator(
        this.passwordForm.get('password'),
        this.passwordForm.get('check')
      ),
    ]);
  }
  createCompareValidator(
    controlOne: AbstractControl | null,
    controlTwo?: AbstractControl | null
  ) {
    return () => {
      if (!controlOne || !controlTwo) return null;
      if (controlOne.value !== controlTwo.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    console.log(this.passwordForm);
    const password = this.passwordForm.value.password
    this.passwordService.resetPassword(this.token, password).subscribe({
      next: () => {
        alert('Password reset successfully');
      },
      error: () => {
        alert('Password reset not successfully');
      },
    });
  }
}

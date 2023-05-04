import { PasswordService } from './../../password/password.service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private passwordService: PasswordService,
    private snackBar: MatSnackBar,

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
    const password = this.passwordForm.value.password
    this.passwordService.resetPassword(this.token, password).subscribe({
      next: () => {
        this.snackBar.open('Password reset successfully');
      },
      error: () => {
        this.snackBar.open('Something went wrong');
      },
    });
  }
}

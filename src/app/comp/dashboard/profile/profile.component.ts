import { UserService } from './../../../user/user.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../dialog/dialog.component';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  accountForm: FormGroup;
  passwordForm: FormGroup;

  hidePass: boolean = false;
  hideOldPass: boolean = false;
  hideConfPass: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.accountForm = this.formBuilder.group({
      login: [''],
      email: ['', [Validators.email, Validators.minLength(6)]],
      shipping_address: [''],
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: this.formBuilder.group({
        password: ['', [Validators.required, this.passwordMatchValidator]],
        confirmPassword: [
          '',
          [Validators.required, this.passwordMatchValidator],
        ],
      }),
    });
  }

  passwordMatchValidator: ValidatorFn = (
    formGroup
  ): ValidationErrors | null => {
    const parent = formGroup.parent as FormGroup;
    if (!parent) return null;
    return parent.get('password')?.value ===
      parent.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  };

  credentailsChange() {
    let { login, email, shipping_address } = this.accountForm.value;
    if (!login) {
      login = undefined;
    }
    if (!email) {
      email = undefined;
    }
    if (!shipping_address) {
      shipping_address = undefined;
    }

    this.userService
      .changeCredentials(email, login, shipping_address)
      .subscribe({
        next: () => {
          this.snackBar.open('Credentials have been changed successfully');
        },
        error: () => {
          // TODO: Add more detailed errors
          this.snackBar.open('Something went wrong');
        },
      });
    // TODO: Refresh navbar so that the new username display's correctly
    // TODO: Refresh session storage so that the info in there is correct
  }
  passwordChange() {
    let { oldPassword, newPassword } = this.passwordForm.value;
    this.userService
      .changePassword(oldPassword, newPassword.password)
      .subscribe({
        next: () => {
          this.snackBar.open('Password has been changed successfully');
        },
        error: (e) => {
          // TODO: Check if detailed errors don't show
          // inappropriate messages to the user
          this.snackBar.open(e.error.message);
        },
      });
  }

  public credentailsErrorHandling = (control: string, error: string) => {
    return this.accountForm.controls[control].hasError(error);
  };

  public errorHandling = (control: string, error: string) => {
    return this.passwordForm.controls[control].hasError(error);
  };

  public nestedErrorHandling = (control: string, error: string) => {
    // cast to FormGroup becouse Angular returns it as AbstractControl base class
    return (this.passwordForm.controls['newPassword'] as FormGroup).controls[
      control
    ].hasError(error);
  };

  deleteAccount() {
    this.dialog
      .open(DialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.userService.deleteAccount().subscribe({
            next: () => {
              this.snackBar.open('Account has been deleted successfully');
            },
            error: (e) => {
              // TODO: Check if detailed errors don't show
              // inappropriate messages to the user
              this.snackBar.open(e.error.message);
            },
          });
        }
      });
  }
}

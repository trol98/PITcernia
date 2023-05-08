import { UserService } from './../../../user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  accountForm: FormGroup;
  passwordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.accountForm = this.formBuilder.group({
      login: [''],
      email: ['', [Validators.email]],
      shipping_address: [''],
    });

    this.passwordForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      password_repeat: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
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
    let { old_password, password, password_repeat } =
      this.passwordForm.value;

    if (password != password_repeat) {
      this.snackBar.open('Passwords do not match');
    } else {
      this.userService.changePassword(old_password, password).subscribe({
        next: () => {
          this.snackBar.open('Password has been changed successfully');
        },
        error: () => {
          // TODO: Add more detailed errors
          this.snackBar.open('Something went wrong');
        },
      });
    }
  }
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

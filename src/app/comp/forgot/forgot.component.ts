import { EmailService } from 'src/app/email/email.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent {
  emailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private snackBar: MatSnackBar
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const emial = this.emailForm.value.email;
    this.emailService.forgotPassword(emial).subscribe({
      next: () => {
        this.snackBar.open('Email send successfully')
      },
      error: () => {
        this.snackBar.open('Something went wrong');
      },
    });
  }
}

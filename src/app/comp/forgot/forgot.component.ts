import { EmailService } from 'src/app/email/email.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent {
  emailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const emial = this.emailForm.value.email;
    this.emailService.forgotPassword(emial).subscribe({
      next: () => {
        alert('Email send successfully');
      },
      error: () => {
        alert('Email send not successfully');
      },
    });
  }
}

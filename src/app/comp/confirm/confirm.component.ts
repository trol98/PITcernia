import { EmailService } from './../../email/email.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent {
  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
    private snackBar: MatSnackBar,
  ) {}

  token: string = '';
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });

    this.emailService.confirmEmail(this.token).subscribe({
      next: () => {
        this.snackBar.open("Email confirmed successfully");
      },
      error: () => {
        this.snackBar.open("Something went wrong");
      },
    });
  }
}

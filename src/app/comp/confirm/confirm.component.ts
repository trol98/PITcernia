import { EmailService } from './../../email/email.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent {
  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  token: string = '';
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });

    this.emailService.confirmEmail(this.token).subscribe({
      next: () => {
        alert("Email confirmed successfully");
      },
      error: () => {
        alert("Email confirmed not successfully");
      },
    });
  }
}

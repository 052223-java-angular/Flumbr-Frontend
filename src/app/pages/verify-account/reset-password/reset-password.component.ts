import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordPayload } from 'src/app/models/reset-password';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]]
      }
    );
  }

  handleSubmit() {
    if (this.resetPasswordForm.valid) {
      // Handle form submission here
      console.log('Form submitted successfully');
      
      // The payload to be sent to the backend API
      const payload: ResetPasswordPayload  = {
        email:
          this.resetPasswordForm.controls['email'].value,
      };

        // Call the authentication service to register the user
        this.authService.resetPassword(payload).subscribe({
          next: (/* value */) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'ResetPassword successful',
              life: AppSettings.DEFAULT_MESSAGE_LIFE,
            });
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
              life: AppSettings.DEFAULT_MESSAGE_LIFE,
            });
          },
        });
        return true;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Registration form is invalid!',
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
        return false;
      }
    }

     
}







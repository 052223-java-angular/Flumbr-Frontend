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
import { RegisterPayload } from 'src/app/models/register-payload';
import { NewPasswordPayload } from 'src/app/models/new-password';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  newPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newPasswordForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  handleSubmit() {
    if (this.newPasswordForm.valid) {

      const token = this.route.snapshot.queryParams['token'];

      // Handle form submission here
      console.log('Form submitted successfully');
      console.log( this.newPasswordForm.controls['password'].value);
      console.log( this.newPasswordForm.controls['confirmPassword'].value);

      // The payload to be sent to the backend API
      const payload: NewPasswordPayload  = {
      token: token,
      password: this.newPasswordForm.controls['password'].value,
      confirmPassword: this.newPasswordForm.controls['confirmPassword'].value,
    };
      
      // Call the authentication service to register the user
      this.authService.newPassword(payload).subscribe({
        next: (/* value */) => {
          console.log("SUCCESS");
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New Password set successful',
            life: AppSettings.DEFAULT_MESSAGE_LIFE,
          });
         
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log("ERRROR " + error.message );
        
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
      console.log("ERRROR - Password Invalid");
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Password Form is invalid!',
        life: AppSettings.DEFAULT_MESSAGE_LIFE,
      });
      return false;
    }
  }



}

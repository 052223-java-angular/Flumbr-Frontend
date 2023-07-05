import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPayload } from 'src/app/models/register-payload';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';

@Component({
  selector: 'app-registration-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get email() {
    return this.registrationForm.get('email');
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
    if (this.registrationForm.valid) {
      // Handle form submission here
      console.log('Form submitted successfully');
      //console.log( this.registrationForm.controls['username'].value);

      // The payload to be sent to the backend API
      const payload: RegisterPayload = {
        username: this.registrationForm.controls['username'].value,
        email: this.registrationForm.controls['email'].value,
        password: this.registrationForm.controls['password'].value,
        confirmPassword:
          this.registrationForm.controls['confirmPassword'].value,
      };

      // Call the authentication service to register the user
      this.authService.register(payload).subscribe({
        next: (/* value */) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful',
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
      alert('Form is Invalid');
      return false;
    }
  }
}

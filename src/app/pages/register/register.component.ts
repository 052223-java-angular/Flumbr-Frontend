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
//import {ToastrService} from 'ngx-toastr';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        username: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
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

  get firstname() {
    return this.registrationForm.get('firstname');
  }

  get lastname() {
    return this.registrationForm.get('lastname');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return { passwordMismatch: true };
    }

    return null;
  }

  handleSubmit() {
    if (this.registrationForm.valid) {
      // Handle form submission here
      // Form Data
      // console.log('Form submitted successfully');
      // console.log( this.registrationForm.controls['username'].value);
      // console.log( this.registrationForm.controls['firstname'].value);
      // console.log( this.registrationForm.controls['lastname'].value);
      // console.log( this.registrationForm.controls['email'].value);
      // console.log( this.registrationForm.controls['password'].value);
      // console.log( this.registrationForm.controls['confirmPassword'].value);

      alert('Form is valid');

      // The payload to be sent to the backend API

      const payload: RegisterPayload = {
        username: this.registrationForm.controls['username'].value,
        firstname: this.registrationForm.controls['firstname'].value,
        lastname: this.registrationForm.controls['lastname'].value,
        email: this.registrationForm.controls['email'].value,
        password: this.registrationForm.controls['password'].value,
        confirmPassword:
          this.registrationForm.controls['confirmPassword'].value,
      };

      // console.log("username is " + payload.username );
      // console.log("password is " + payload.password);
      // console.log("confirmPassword " + payload.confirmPassword);

      // Call the authentication service to register the user
      this.authService.register(payload).subscribe({
        next: (value) => {
          // Handle the success response
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // Handle the error response
          //this.toastr.error(error.error.message);
          console.log(error.error.message);
        },
      });
      return true;
    } else {
      alert('Form is Invalid');
      return false;
    }
  }
}

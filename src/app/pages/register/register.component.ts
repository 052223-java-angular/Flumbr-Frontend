import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { RegisterPayload } from 'src/app/models/register-payload';
import { AuthServiceService } from 'src/app/services/auth-service.service';
//import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registration-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router:Router ) {
}

ngOnInit(): void {
  this.registrationForm = this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validator: this.passwordMatchValidator });
}

  handleSubmit() {
    if (this.registrationForm.valid) {
      // Handle form submission here
      console.log('Form submitted successfully');
      // The payload to be sent to the backend API
      const payload: RegisterPayload = {
        username: this.registrationForm.controls['username'].value,
        password: this.registrationForm.controls['password'].value,
        confirmPassword: this.registrationForm.controls['confirmPassword'].value,
      };
       
      console.log("username is " + payload.username );
      console.log("password is " + payload.password);
      console.log("confirmPassword " + payload.confirmPassword);

      // Call the authentication service to register the user
      this.authService.register(payload).subscribe({
          next: value => {
            // Handle the success response
            
            this.router.navigate(['/login']);
          },
          error: error => {
            // Handle the error response
            //this.toastr.error(error.error.message);
            console.log(error.error.message);
          }
      });
    }
  }


  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
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
  
  
  
}

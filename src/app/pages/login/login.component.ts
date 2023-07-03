import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service';
import { TokenService } from '../../services/tokenservice.service';
import { LoginPayload } from '../../models/login-payload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true; // controls if the user wants to see what they typed
  loginForm!: FormGroup;

  // need get toaster

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private tokenService: TokenService,
    router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLoginForm() {
    console.log('called submitLoginForm');

    if (this.loginForm.invalid) {
      this.loginForm.controls['username'].markAsTouched();
      this.loginForm.controls['password'].markAsTouched();
      return;
    }

    const payload: LoginPayload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.authService.login(payload).subscribe({
      next: (result) => {
        //this.tokenService.saveUser(result)
        //this.tokenService.saveToken(result.token)// need to revise when backend is done

        //save refresh token?

        //Add toaster
        this.loginForm.reset();
        //Route to page after successful login
      },
      error: (error) => {
        console.log(error.message);
        this.loginForm.reset();
        //toaster for incorrect login
      },
    });
  }
}

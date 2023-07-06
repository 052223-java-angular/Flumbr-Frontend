import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/tokenservice.service';
import { LoginPayload } from '../../models/login-payload';
import { Router } from '@angular/router';
import {MessageService} from "primeng/api";
import {AppSettings} from "../../global/app-settings";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  protected hide: boolean = true; // controls if the user wants to see what they typed
  loginForm!: FormGroup;

  // need get toaster

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private messageService: MessageService
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
        this.tokenService.saveUser(result)
        this.tokenService.saveToken(result.token)
        //this.tokenService.saveRefreshToken(result.token)
        console.log("success")
        //Add toaster
        this.loginForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful',
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
        //this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error.message);
        this.loginForm.reset();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
      },
    });
  }
}

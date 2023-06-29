import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth-service.service";
import {TokenService} from "../../services/tokenservice.service";
import {LoginPayload} from "../../models/login-payload";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {data} from "autoprefixer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide: boolean = true;// controls if the user wants to see what they typed
  loginForm!: FormGroup;

  // need get toaster
  //need router
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  submitLoginForm()
  {
    if (this.loginForm.invalid) {
      this.loginForm.controls['username'].markAsTouched();
      this.loginForm.controls['password'].markAsTouched();
      this.loginForm.reset();
      return;
    }

    const payload:LoginPayload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }

    this.authService.login(payload).subscribe({
      next:(result)=>
      {
        //this.tokenService.saveUser(result)
        //this.tokenService.saveToken(result.token)// need to revise when backend is done

        //save refresh token?

        //Add toaster

        //Route to page after successful login
      },
      error:(error)=>
      {
        console.log(error.message)
        //toaster for incorrect login

      }
    })


  }
}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {TokenService} from "../../services/tokenservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router,
              private tokenService:TokenService) {}

  login() {}

  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.tokenService.isLoggedIn();
  }
}

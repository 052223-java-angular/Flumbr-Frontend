import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {TokenService} from "../../services/tokenservice.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService,
              private tokenService:TokenService) {}

  login() {}

  logout() {}

  isAuthenticated() {
    return false;
  }
}

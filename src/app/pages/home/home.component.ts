import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/tokenservice.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    console.log("In homeComponent.ngOnInit()");
    if (this.checkIfLoggedIn()) {
      this.router.navigate(['/posts']);
    }
  }

  checkIfLoggedIn(): boolean {
    if (this.tokenService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}

import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/tokenservice.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private tokenService: TokenService){}

  checkIfLoggedIn(): boolean
  {
    if(this.tokenService.isLoggedIn())
    {
       return true;
    }
    else{
      return false;
    }
  }

}

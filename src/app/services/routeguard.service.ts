import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from './tokenservice.service';

@Injectable({
  providedIn: 'root',
})
export class RouteguardService {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user: any | null = this.tokenService.getUser();

    if (!user.id) {
      this.tokenService.signOut();
      this.router.navigate(['/login']);
    }

    return true;
  }
}

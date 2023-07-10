import { Injectable } from '@angular/core';

// services
import { TokenService } from '../tokenservice.service';

import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService {
  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // don't send token when user is not logged in
    if (!this.tokenService.isLoggedIn()) {
      return next.handle(req);
    }

    // allows http requests to skip the token attachment
    if (typeof req.headers.get('Skip') == 'string') {
      const modifiedReq = req.clone({ headers: req.headers.delete('Skip') });
      return next.handle(modifiedReq);
    }

    // attach token
    const modifiedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        this.tokenService.getToken() as string
      ),
    });
    return next.handle(modifiedReq);
  }
}

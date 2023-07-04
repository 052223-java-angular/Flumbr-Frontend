import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from '../models/register-payload';
import { LoginPayload } from '../models/login-payload';
import { EMPTY, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //TODO: READ FROM ENV
  baseUrl = 'http://localhost:5000/flumblr/api';

  constructor(private http: HttpClient) {}

  /**
   * @param payload - register payload - username, password
   */
  register(payload: RegisterPayload): Observable<any> {  
    return this.http.post<any>(`${this.baseUrl}/auth/register`, payload );
  }

  /**
   * Any for now waiting till backend is completed for this feature
   * @param payload - login payload - username, password
   */
  login(payload: LoginPayload): Observable<any> {
    // Return an empty observable until the backend feature is completed
    return EMPTY;
  }
}

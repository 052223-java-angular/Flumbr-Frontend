import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from '../models/register-payload';
import { LoginPayload } from '../models/login-payload';
import { ResetPasswordPayload } from '../models/reset-password';
import { EMPTY, Observable } from 'rxjs';
import { AppSettings } from '../global/app-settings';
import {Auth} from "../models/auth/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = AppSettings.API_URL;

  constructor(private http: HttpClient) {}

  /**
   * @param payload - register payload - username, password
   */
  register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, payload);
  }

  /**
   * Any for now waiting till backend is completed for this feature
   * @param payload - login payload - username, password
   */
  login(payload: LoginPayload): Observable<Auth> {
    // Return an empty observable until the backend feature is completed
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, payload);
  }

  resetPassword(payload: ResetPasswordPayload): Observable<any> {
    //TODO: replace with api end point after backend implementation
    return this.http.post<any>(`${this.baseUrl}/auth/`, payload);
  }


  newPassword(formData: FormData): Observable<any> {
    //TODO: replace with api end point after backend implementation
    return this.http.post<any>(`${this.baseUrl}/auth/`, formData);
  }
}

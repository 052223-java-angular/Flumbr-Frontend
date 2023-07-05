import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from '../models/register-payload';
import { LoginPayload } from '../models/login-payload';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Auth} from "../models/auth/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * @param payload - register payload - username, password
   */
  register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, payload);
  }

  /**
   *
   * @param payload - login payload - username, password
   */
  login(payload: LoginPayload): Observable<Auth> {

    return this.http.post<Auth>(`${this.baseUrl}/auth/login`,payload);
  }
}

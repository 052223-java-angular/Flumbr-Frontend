import { Injectable } from '@angular/core';
import {LoginPayload} from "../models/login-payload";
import {EMPTY, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor() {}


  /**
   * Any for now waiting till backend is completed for this feature
   * @param payload - login payload - username, password
   */
  login(payload: LoginPayload):Observable<any> {
  // Return an empty observable until the backend feature is completed
    return EMPTY;
  }
}

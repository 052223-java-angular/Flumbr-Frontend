import { Injectable } from '@angular/core';
import {RegisterPayload} from "../models/register-payload";
import {EMPTY, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  /**
   * TODO: Waiting for backend
   * @param payload - register payload - username, password
   */
  register(payload: RegisterPayload): Observable<any> {
    return EMPTY;
   }
}


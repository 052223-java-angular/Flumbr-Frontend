import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  /**
   * Clears the session storage when a user signs out
   */
  signOut(): void {
    window.sessionStorage.clear();
  }

  /**
   * Saves the user token when a user logs in
   * @param token
   */
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  /**
   * Calls the token whenever needed throughout the application
   */
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Saves refresh token
   * @param token - new token
   */
  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  /**
   * Gets the new token
   */
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  /**
   * Saves user information to be called throughout the application
   * @param user
   */
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Gets saved user information to be called throughout the application
   */
  public getUser(): any {
    if (this.isTokenExpired()) {
      this.signOut();
    }
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    } else {
      this.signOut();
    }

    return {};
  }

  /**
   * Checks if user is logged in (i.e. is token expired?)
   */
  public isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }

  /**
   * checks if the current saved token is expired
   * @private
   */
  private isTokenExpired(): boolean {
    const jwt = this.getToken();
    if (!jwt) {
      return true;
    }
    const jwtPayload = JSON.parse(window.atob(jwt.split('.')[1]));
    const expirationDate = new Date(jwtPayload.exp * 1000);
    return new Date().getTime() > expirationDate.getTime();
  }
}

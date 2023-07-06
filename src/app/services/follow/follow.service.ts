import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { TokenService } from '../tokenservice.service';


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  baseUrl = AppSettings.API_URL;
  authHeader!: HttpHeaders;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  // should have a method like this implmented in authService
  getHttpAuthHeader() : HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaG91dGVzdGVyMDAxIiwicm9sZSI6bnVsbCwiaWQiOiI4YjQ3Y2NmMi1hZjg4LTQ0NDEtYmYwZi0xY2ViMzJmYjk3NDIiLCJleHAiOjE2ODg3MTMwMzUsImlhdCI6MTY4ODY3NzAzNSwiZW1haWwiOm51bGx9.IlmKh1e9XvPUKuyIrYgvGretg8_XMYrtiQzY3tJuR6c'
    })
  }
  
  httpFollow(followedUsername: string) : Observable<HttpResponse<any>> {
    return this.httpClient
      .post<HttpResponse<any>>(`${this.baseUrl}/follows/${followedUsername}`, {}, 
        {headers: this.getHttpAuthHeader()});
  }

  httpUnfollow(followedUsername: string) : Observable<HttpResponse<any>> {
    return this.httpClient
      .delete<HttpResponse<any>>(`${this.baseUrl}/follows/${followedUsername}`,
        {headers: this.getHttpAuthHeader()});
  }

}

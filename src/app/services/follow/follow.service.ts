import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { TokenService } from '../tokenservice.service';


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = AppSettings.API_URL;
  
  httpFollow(followedUsername: string) : Observable<HttpResponse<any>> {
    return this.httpClient
      .post<HttpResponse<any>>(`${this.baseUrl}/follows/${followedUsername}`, {});
  }

  httpUnfollow(followedUsername: string) : Observable<HttpResponse<any>> {
    return this.httpClient
      .delete<HttpResponse<any>>(`${this.baseUrl}/follows/${followedUsername}`);
  }

}

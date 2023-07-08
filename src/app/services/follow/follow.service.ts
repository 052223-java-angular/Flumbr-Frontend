import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = AppSettings.API_URL;

  // returns the list of usernames the logged-in user is following
  httpGetIsFollowing() : Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/follows`);
  }
  
  // the request does not return anything, so return an HttpResponse to extract header contents if it is required in future impl
  httpFollow(followedUsername: string) : Observable<HttpResponse<any>> {
    return this.httpClient
      .post<HttpResponse<any>>(`${this.baseUrl}/follows/${followedUsername}`, {});
  }

  // the request does not return anything, so return an HttpResponse to extract header contents if it is required in future impl
  httpUnfollow(followedUsername: string) : Observable<HttpResponse<any>> {
    return this.httpClient
      .delete<HttpResponse<any>>(`${this.baseUrl}/follows/${followedUsername}`);
  }

}

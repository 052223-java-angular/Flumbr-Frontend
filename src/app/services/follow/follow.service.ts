import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import {PotentialFollowRequestPayload} from "../../models/potential-follow-request-payload";

@Injectable({
  providedIn: 'root',
})
export class FollowService implements OnDestroy {
  private baseUrl = AppSettings.API_URL;
  $followingUsernames: BehaviorSubject<string[]> = new BehaviorSubject(
    [] as string[]
  );
  $deletedFollow: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<string[]>(`${this.baseUrl}/follows`).subscribe({
      next: (res) => {
        this.$followingUsernames.next(res);
      },
      error: (err) => {
        this.$followingUsernames.next([]);
      },
    });
  }

  ngOnDestroy() {
    this.$followingUsernames.unsubscribe();
  }

  getDeletedFollowBehaviorSubject(): BehaviorSubject<string> {
    return this.$deletedFollow;
  }

  // returns the list of usernames the logged-in user is following
  httpGetIsFollowing(): Observable<string[]> {
    return this.$followingUsernames.asObservable();
  }

  // the request does not return anything, so return an HttpResponse to extract header contents if it is required in future impl
  httpFollow(followedUsername: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(
      `${this.baseUrl}/follows/${followedUsername}`,
      {}
    );
  }

  // the request does not return anything, so return an HttpResponse to extract header contents if it is required in future impl
  httpUnfollow(followedUsername: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .delete<HttpResponse<any>>(`${this.baseUrl}/follows/${followedUsername}`)
      .pipe(
        tap({
          next: () => {
            // update delete following behavior subject
            this.$deletedFollow.next(followedUsername);
          },
        })
      );
  }


  potentialFollowers(payload: PotentialFollowRequestPayload):Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/follows/getFollowers`,payload)

  }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';

@Injectable({
  providedIn: 'root',
})
export class FollowService implements OnDestroy {
  private baseUrl = AppSettings.API_URL;
  followingUsernames!: string[];
  firstCall: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<string[]>(`${this.baseUrl}/follows`).subscribe({
      next: (res) => {
        this.firstCall.next(res);
        this.followingUsernames = res;
      },
      error: (err) => {
        this.firstCall.next([]);
        this.followingUsernames = [];
      },
    });
  }

  ngOnDestroy() {
    this.firstCall.unsubscribe();
  }

  // returns the list of usernames the logged-in user is following
  httpGetIsFollowing(): Observable<string[]> {
    if (this.followingUsernames) {
      return of(this.followingUsernames);
    }

    return this.firstCall.asObservable();
  }

  // the request does not return anything, so return an HttpResponse to extract header contents if it is required in future impl
  httpFollow(followedUsername: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<HttpResponse<any>>(
        `${this.baseUrl}/follows/${followedUsername}`,
        {}
      )
      .pipe(
        tap({
          next: () => {
            this.followingUsernames.push(followedUsername);
          },
        })
      );
  }

  // the request does not return anything, so return an HttpResponse to extract header contents if it is required in future impl
  httpUnfollow(followedUsername: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .delete<HttpResponse<any>>(`${this.baseUrl}/follows/${followedUsername}`)
      .pipe(
        tap({
          next: () => {
            this.followingUsernames = this.followingUsernames.filter(
              (currUsername) => currUsername != followedUsername
            );
          },
        })
      );
  }
}

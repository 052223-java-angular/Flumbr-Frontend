import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProfilePayload } from '../models/profile/profile-payload';
import { TagPayload } from '../models/tag-payload';
import { AppSettings } from '../global/app-settings';
import { BioPayload } from '../models/profile/bio-payload';
import { ThemePayload } from '../models/profile/theme-payload';
import { TokenService } from './tokenservice.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.tokenService.getUser().id,
      'Content type': 'application/json',
    }),
  };

  jsonAsset: string = 'assets/profile.json';
  profile!: ProfilePayload;
  baseUrl = AppSettings.API_URL;

  // Constructor for profile service
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.setLocalStorageProfileImg();
  }

  // retrieve user profile based on user id
  getUser(user_id: string): Observable<ProfilePayload> {
    //let queryParams = new HttpParams().set('username', username)
    return this.http.get<ProfilePayload>(`${this.baseUrl}/profile/${user_id}`);
  }

  // update theme for user
  updateTheme(user_id: string, payload: ThemePayload): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/profile/theme/${user_id}`,
      payload
    );
  }

  // send updated bio to backend to update users bio field
  updateUserBio(user_id: string, payload: BioPayload): Observable<void> {
    console.log('user id: ' + user_id);
    return this.http.patch<void>(
      `${this.baseUrl}/profile/bio/${user_id}`,
      payload
    );
  }

  // upload an image file to send to back end, MUST be multiMedia but only an image
  uploadImage(
    userId: string,
    formData: FormData,
    payload: BioPayload
  ): Observable<any> {
    console.log('hitting upload image service');

    console.log(formData.get('profileId'));
    console.log(formData.get('file'));

    //const headers = new HttpHeaders().set('Authorization', this.tokenService.getToken()!);
    //const headers = new HttpHeaders().set('Authorization', this.tokenService.getToken()!);

    return this.http
      .patch<void>(`${this.baseUrl}/profile/upload/${userId}`, formData)
      .pipe(
        tap({
          next: () => {
            localStorage.removeItem('profileImg');
            this.setLocalStorageProfileImg();
          },
        })
      );
  }

  // retrieve this user
  getUserTest(userId: string): Observable<any> {
    return this.http.get(this.jsonAsset);
  }

  // sets a field for profileImg in local storage
  setLocalStorageProfileImg() {
    if (localStorage.getItem('profileImg')) {
      console.log('profile img is present');
      return;
    }

    this.getUser(this.tokenService.getUser().id).subscribe({
      next: (res) => {
        localStorage.setItem('profileImg', res.profile_img);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

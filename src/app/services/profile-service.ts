import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProfilePayload} from "../models/profile/profile-payload";
import { TagPayload} from "../models/tag-payload";
import {AppSettings} from "../global/app-settings";
import {BioPayload} from "../models/profile/bio-payload";
import {ThemePayload} from "../models/profile/theme-payload";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  jsonAsset: string = "assets/profile.json"
  profile!: ProfilePayload;
  baseUrl = AppSettings.API_URL;

  // Constructor for profile service
  constructor(private http: HttpClient) {  }

  // retrieve user profile based on user id
  getUser(user_id: string): Observable<ProfilePayload> {
    //let queryParams = new HttpParams().set('username', username)
    return this.http.get<ProfilePayload>(`${this.baseUrl}/profile/${user_id}`);
  }

  // update theme for user
  updateTheme(user_id: string, payload: ThemePayload): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/profile/theme/${user_id}`, payload)
  }

  // send updated bio to backend to update users bio field
  updateUserBio(user_id: string, payload: BioPayload ): Observable<void> {
    console.log("user id: " + user_id);
    return this.http.patch<void>(`${this.baseUrl}/profile/bio/${user_id}`, payload);
  }

  // upload an image file to send to back end, MUST be multiMedia but only an image
  uploadImage( file: File): Observable<any> {
    return this.http.patch<void>(`this.baseUrl}/profile/bio`, file);
  }

  // retrieve this user
  getUserTest(userId: string): Observable<any> {
    return this.http.get(this.jsonAsset);
  }

}

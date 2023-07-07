import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProfilePayload} from "../models/profile-payload";
import { TagPayload} from "../models/tag-payload";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  jsonAsset: string = "assets/profile.json"
  profile!: ProfilePayload;
  baseUrl = "Testing URL";

  // Constructor for profile service
  constructor(private http: HttpClient) {  }

  // retrieve user profile based on user id
  getUser(user_id: string): Observable<ProfilePayload> {
    //let queryParams = new HttpParams().set('username', username)
    return this.http.get<ProfilePayload>(`src/assets/profile.json`);
  }

  // retrieve this user
  getUserTest(): Observable<any> {
    return this.http.get(this.jsonAsset);
  }

}

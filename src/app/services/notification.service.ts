import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  fetchNotifications() : Observable<Notification[]> {
    // todo extract user token from session or local storage
    // OR pending Impl of Interceptor.
    return this.httpClient.get<Notification[]>("/assets/notifications.json");
  }
}

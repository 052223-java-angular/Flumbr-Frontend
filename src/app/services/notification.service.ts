import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationPayload } from '../models/notification/notification-payload';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  fetchNotifications() : Observable<NotificationPayload[]> {
    // todo extract user token from session or local storage
    // OR pending Impl of Interceptor.
    return this.httpClient.get<NotificationPayload[]>("/assets/notifications.json");
  }
}

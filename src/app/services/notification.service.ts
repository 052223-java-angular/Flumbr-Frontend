import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from '../models/INotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  fetchNotifications() : Observable<INotification[]> {
    // todo extract user token from session or local storage
    // OR pending Impl of Interceptor.
    return this.httpClient.get<INotification[]>("/assets/notifications.json");
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification/notification';
import { NotificationType } from '../models/notification/notification-type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  fetchNotifications(payload: string) : Observable<Notification[]> {
    return this.httpClient.get<Notification[]>("/assets/notifications/notifications.json");
  }

  fetchNotificationsTypes() : Observable<NotificationType[]> {
    return this.httpClient.get<NotificationType[]>("/assets/notifications/notification-type.json");
  }

  updateNotificationAsRead(payload: Notification) : Observable<Notification[]> {
    return this.httpClient.put<Notification[]>('/notifications', payload);
    // return this.fetchNotifications('');
  }
  
}

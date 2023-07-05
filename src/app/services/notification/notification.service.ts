import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../../models/notification/notification';
import { NotificationType } from '../../models/notification/notification-type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  messagePanelIsEmpty = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  // notifies subscribers the message panel list is emoty
  raiseMessagePanelIsEmpty(isEmpty: boolean) : void {
    this.messagePanelIsEmpty.next(isEmpty);
  }

  // fetch notifications
  fetchNotifications() : Observable<Notification[]> {
    return this.httpClient.get<Notification[]>("/assets/notifications/notifications.json");
  }

  // fetch notification types
  fetchNotificationsTypes() : Observable<NotificationType[]> {
    return this.httpClient.get<NotificationType[]>("/assets/notifications/notification-type.json");
  }

  // update notifications as read
  updateNotificationAsRead(payload: Notification) : Observable<Notification[]> {
    return this.httpClient.put<Notification[]>('/', payload);
  }
  
}

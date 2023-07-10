import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Notification } from '../../models/notification/notification';
import { NotificationType } from '../../models/notification/notification-type';
import { AppSettings } from 'src/app/global/app-settings';
import { TokenService } from '../tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  private baseUrl = AppSettings.API_URL;
  messagePanelIsEmpty = new Subject<boolean>();
  stateIsReload = new Subject<boolean>();
    
  // backend notification names
  // comment :: postComment, comment vote :: commentLike, follow :: follow, post vote :: postLike, profile vote :: profileLike

  raiseStateIsReloading(isReloading: boolean) : void {
    this.stateIsReload.next(isReloading)
  }

  // notifies subscribers the message panel list is emoty
  raiseMessagePanelIsEmpty(isEmpty: boolean) : void {
    this.messagePanelIsEmpty.next(isEmpty);
  }

  // fetch notifications
  httpFetch() : Observable<Notification[]> {
    return this.httpClient
      .get<Notification[]>(`${this.baseUrl}/notifications/all/${(this.tokenService.getUser()).id}`);
  }

  // fetch notification types
  httpFetchTypesFromFile() : Observable<NotificationType[]> {
    return this.httpClient.get<NotificationType[]>("/assets/notifications/notification-type.json");
  }

  // update notifications as viewed
  // backend requires a userIrd and notificationId payload
  httpUpdateAsViewed(notification: Notification) : Observable<HttpResponse<any>> {
    const payload = {"userId": (this.tokenService.getUser()).id, "notificationId": notification.id}
    return this.httpClient.put<HttpResponse<any>>(`${this.baseUrl}/notifications/${notification.id}`, payload);
  }
  
  // delete notification
  httpDelete(notification: Notification) : Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(`${this.baseUrl}/notifications/${notification.id}`);
  }

}

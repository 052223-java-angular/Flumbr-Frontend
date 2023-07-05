import { Component, OnInit } from '@angular/core';
import { MatBadgeSize } from '@angular/material/badge';
import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification/notification';
import { NotificationType } from 'src/app/models/notification/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';


// Component for handing message notifications
@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {  
  // list of material-ui icons used; 
  // home, show_chart, comment, rate_review, thumb_up, person_add, message;

  // expected data types and conditonal variables for displaying data within the view
  panelIsOpen: boolean = false;
  notifications$!: Observable<Notification[]>;
  notificationTypes$!: Observable<NotificationType[]>;

  // atttribute fields for passing values down to notification-type component
  indexOfType!: number;
  activeNotificationType: string = '';
  badgeColor: ThemePalette = 'primary';
  badgeSize: MatBadgeSize = 'small';
  badgeContent: number = 0;

  constructor(private notificationService: NotificationService) {}

  // initialization 
  ngOnInit(): void {
    this.notifications$ = this.notificationService.fetchNotifications();
    this.notificationTypes$ = this.notificationService.fetchNotificationsTypes();

    // for detecting when no messages are left, so update the panelOpenState
    this.notificationService.messagePanelIsEmpty.subscribe((panelState) => {
      this.panelIsOpen = !panelState;
    }).unsubscribe();
  }

  // toggles the notification messages
  toggleNotification(iconIdx: number, iconMatName: string) : void {
    if (this.indexOfType != iconIdx) {
      this.panelIsOpen = false;
      this.activeNotificationType = iconMatName;
      this.indexOfType = iconIdx;
    }
    this.panelIsOpen = !this.panelIsOpen;
  }

  // since db has only 3 fields, this method is used to
  // assign a material-ui icon names and badge count to the NotificationType instance
  assignProps(notificationType: NotificationType, notifications: Notification[]) : string | null {
    const iconName = notificationType.name;
    switch (iconName) {
      case "home": { 
        notificationType.matIconName = "home"; 
        notificationType.badgeContent = this.getUnreadCount(notifications, notificationType.matIconName);
        return "home"; }
      case "trending": { 
        notificationType.matIconName = "show_chart"; 
        notificationType.badgeContent = this.getUnreadCount(notifications, notificationType.matIconName);
        return "show_chart"; }
      case "comments": { 
        notificationType.matIconName = "comment"; 
        notificationType.badgeContent = this.getUnreadCount(notifications, notificationType.matIconName);
        return "comment"; }
      case "reviews": { 
        notificationType.matIconName = "rate_review"; 
        notificationType.badgeContent = this.getUnreadCount(notifications, notificationType.matIconName);
        return "rate_review"; }
      case "messages": { 
        notificationType.matIconName = "message"; 
        notificationType.badgeContent = this.getUnreadCount(notifications, notificationType.matIconName);
        return "message"; }
      case "likes":{ 
        notificationType.matIconName = "thumb_up"; 
        notificationType.badgeContent = this.getUnreadCount(notifications, notificationType.matIconName);
        return "thumb_up"; }
      case "friends": { 
        notificationType.matIconName = "person_add"; 
        notificationType.badgeContent = this.getUnreadCount(notifications, notificationType.matIconName);
        return "person_add"; }
      default: return null;
    }
  }


  // counts the number of messages for the matching icon / notification type
  private getUnreadCount(notifications: Notification[], notificationType: string) : number {
    this.badgeContent = notifications.filter(notification => notification.type === notificationType).length;
    return this.badgeContent;
  }

}

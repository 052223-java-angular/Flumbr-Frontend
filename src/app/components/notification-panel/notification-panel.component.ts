import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBadgeSize } from '@angular/material/badge';
import { ThemePalette } from '@angular/material/core';
import { Observable, Subject, map } from 'rxjs';
import { Notification } from 'src/app/models/notification/notification';
import { NotificationType } from 'src/app/models/notification/notification-type';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {  
  // iconList: string[] = ['home', 'show_chart', 'comment', 'rate_review', 'thumb_up', 'person_add', 'message'];
  panelOpenState: boolean = false;
  notifications$!: Observable<Notification[]>;
  notificationTypes$!: Observable<NotificationType[]>;

  panelId: number = -1;
  activeIcon: string = '';
  badgeColor: ThemePalette = 'primary';
  badgeSize: MatBadgeSize = 'small';
  badgeContent: number = 0;


  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications$ = this.notificationService.fetchNotifications();
    this.notificationTypes$ = this.notificationService.fetchNotificationsTypes();
  }

  toMatIconFrom(notificationType: NotificationType) : string | null {
      const iconName = notificationType.name;
      switch (iconName) {
        case "home": { notificationType.matIconName = "home"; return "home"; }
        case "trending": { notificationType.matIconName = "show_chart"; return "show_chart"; }
        case "comments": { notificationType.matIconName = "comment"; return "comment"; }
        case "reviews": { notificationType.matIconName = "rate_review"; return "rate_review"; }
        case "messages": { notificationType.matIconName = "message"; return "message"; }
        case "likes":{ notificationType.matIconName = "thumb_up"; return "thumb_up"; }
        case "friends": { notificationType.matIconName = "person_add"; return "person_add"; }
        default: return null;
      }
  }

  // toggles the notification messages
  toggleNotification(idx: number, iconName: string, notifications: Notification[]) : void {
    if (this.panelId != idx) {
      this.activeIcon = iconName;
      this.panelId = idx;
      this.badgeContent = this.getUnreadCount(notifications, iconName);
    }
    this.panelOpenState = !this.panelOpenState;
  }

  getUnreadCount(notifications: Notification[], type: string) : number {
    return notifications.filter(item => item.type === type).length;
  }

}

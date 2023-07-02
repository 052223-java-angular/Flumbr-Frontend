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
  badgeSize: MatBadgeSize = 'medium';
  badgeContent: number = 0;


  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications$ = this.notificationService.fetchNotifications("");
    this.notificationTypes$ = this.notificationService.fetchNotificationsTypes();
  }

  toggleNotification(idx: number, iconName: string, notifications: Notification[]) : void {
    // pull notification messages
    if (this.panelId != idx) {
      this.activeIcon = iconName;
      this.panelId = idx;
      this.badgeContent = this.getUnreadCount(notifications, iconName)
      this.notifications$ = this.notificationService.fetchNotifications(iconName);
    }
    this.panelOpenState = !this.panelOpenState;
  }

  getUnreadCount(notifications: Notification[], type: string) : number {
    return notifications.filter(item => item.type === type).length;
  }

}

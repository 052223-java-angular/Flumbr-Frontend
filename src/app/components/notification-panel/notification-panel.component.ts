import { Component, Input, OnInit } from '@angular/core';
import { MatBadgeSize } from '@angular/material/badge';
import { ThemePalette } from '@angular/material/core';
import { Observable, map } from 'rxjs';
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
  constructor(private notificationService: NotificationService) {}

  // expected data types and conditonal variables for displaying data within the view
  menuIsOpen: boolean = false;
  panelIsOpen: boolean = false;
  notifications$!: Observable<Notification[]>;
  notificationTypes$!: Observable<NotificationType[]>;

  // atttribute fields for passing values down to notification-type component
  indexOfType!: number;
  activeNotificationType: string = '';
  activeMatIcon: string = '';
  badgeColor: ThemePalette = 'primary';
  badgeSize: MatBadgeSize = 'small';

  totalUnread = 0;
  stateIsReload!: boolean;

  // initialization 
  ngOnInit(): void {
    this.stateIsReload = true;

    this.notifications$ = this.notificationService.httpFetch().pipe(
      map((el) => { 
        this.totalUnread = this.getTotalUnreadCount(el);
        return el.map(notification => this.assignProps(notification));
      }));

    this.notificationTypes$ = this.notificationService.httpFetchTypesFromFile().pipe(
      map((el) => el.map(type => this.assignProps(type) )))

    // for detecting when no messages are left, so update the panelOpenState
    this.notificationService.messagePanelIsEmpty.subscribe((panelState) => {
      this.panelIsOpen = !panelState;
    });

  }

  // toogle the main notification menu
  toggleTypeMenu() : void {
    this.menuIsOpen = !this.menuIsOpen;
    this.panelIsOpen = false;
    this.activeMatIcon = '';
  }

  // toggles the notification messages panel
  toggleMessagePanel(iconIdx: number, notificationType: NotificationType) : void {
    if (this.indexOfType != iconIdx) {
      this.panelIsOpen = false;
      this.activeNotificationType = notificationType.originName;
      this.activeMatIcon = notificationType.matIconName;
      this.indexOfType = iconIdx;
    }
    this.panelIsOpen = !this.panelIsOpen;
  }

  // counts the total unread notifications
  getTotalUnreadCount(notifications: Notification[]) : number {
    return notifications.filter(noti => !noti.viewed).length;
  }

  // counts the number of messages for the matching icon / notification type
  getBadgeUnreadCount(originName: string, notifications: Notification[]) : number {
    return notifications.filter(
      notification => notification.notificationType === originName && !notification.viewed).length;
  }

  // since db has only 3 fields, this method is used to
  // assign a material-ui icon names and badge count to the NotificationType instance
  assignProps(notificationType: NotificationType | Notification) : any {

    let originName;
    if (notificationType.hasOwnProperty("originName")) {
      originName =  notificationType.originName; // this is coming from json file
    }
    if (notificationType.hasOwnProperty("notificationType")) {
      originName =  notificationType.notificationType; // this is coming from http notification object
    }

    switch (originName) {
      case "postComment": { 
        notificationType.matIconName = "comment"; 
        break;
      }
      case "commentLike": { 
        notificationType.matIconName = "favorite_border";  
        break;
       }
      case "follow": { 
        notificationType.matIconName = "repeat_icon";  
        break;
      }
      case "postLike":{ 
        notificationType.matIconName = "thumb_up";  
        break;
      }
      case "profileLike": { 
        notificationType.matIconName = "face";  
        break;
      }
    }
    return notificationType;
  }

}

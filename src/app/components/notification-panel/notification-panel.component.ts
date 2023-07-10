import { Component, Input, OnInit } from '@angular/core';
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
  
  // comment :: postComment
  // comment vote :: commentLike
  // follow :: follow
  // post vote :: postLike
  // profile vote :: profileLike

  // expected data types and conditonal variables for displaying data within the view
  menuIsOpen: boolean = false;
  panelIsOpen: boolean = false;
  notifications$!: Observable<Notification[]>;
  notificationTypes$!: Observable<NotificationType[]>;
  notificationTypes!: NotificationType[];
  notifications!: Notification[];

  // atttribute fields for passing values down to notification-type component
  indexOfType!: number;
  activeNotificationType: string = '';
  badgeColor: ThemePalette = 'primary';
  badgeSize: MatBadgeSize = 'small';
  badgeContent: number = 0;

  totalUnread = 0;
  renderCount: number = 0;

  constructor(private notificationService: NotificationService) {}

  // initialization 
  ngOnInit(): void {

    this.notificationService.fetchNotifications().subscribe({
      next: (notifications: Notification[]) => {
        // assign object and matIconName to object to display mat icon within messages
        this.notifications = notifications;
        this.notifications.forEach(noti => this.assignProps(noti));
        this.totalUnread = this.getTotalUnreadCount(this.notifications);

        this.notificationService.fetchNotificationsTypes().subscribe((resData) => {
          this.notificationTypes = resData;
          this.notificationTypes.forEach(type => {
            // assign matIconName to type and get the count of unread messages
            this.assignProps(type); 
            this.getUnreadCount(type.originName, this.notifications);
          })
        })
      },
    });

    // for detecting when no messages are left, so update the panelOpenState
    this.notificationService.messagePanelIsEmpty.subscribe((panelState) => {
      // this.toggleNotification(-1, '');
      this.panelIsOpen = !panelState;
    }).unsubscribe();

  }


  decrementTotalUnread() : void {
    this.totalUnread = this.getTotalUnreadCount(this.notifications);
  }


  expandNotificationMenu() : void {
    this.menuIsOpen = !this.menuIsOpen;
    this.panelIsOpen = false;
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
  assignProps(notificationType: NotificationType | Notification) : string | null {

    let originName;
    if (notificationType.hasOwnProperty("originName")) {
      originName =  notificationType.originName; // this is coming from json file
    }
    if (notificationType.hasOwnProperty("notificationType")) {
      originName =  notificationType.notificationType; // this is coming from http notification object
      console.log(originName);
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
    return notificationType.matIconName;
  }

  getTotalUnreadCount(notifications: Notification[]) : number {
    return notifications.filter(noti => !noti.viewed).length;
  }


  // counts the number of messages for the matching icon / notification type
  getUnreadCount(originName: string, notifications: Notification[]) : number {
    this.badgeContent = notifications.
      filter(notification => notification.notificationType === originName && !notification.viewed).length;
    return this.badgeContent;
  }

}

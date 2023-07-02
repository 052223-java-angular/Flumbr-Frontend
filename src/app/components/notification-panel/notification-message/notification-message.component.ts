import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/models/notification/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css']
})
export class NotificationMessageComponent {
  @Input() notifications: Notification[] = [];
  @Input() activeIcon: string = '';
  
  constructor(private notificationService: NotificationService) {}

  // updates the notification status as read
  updateNotificationAsRead(notification: Notification) : void {
    this.updateReadStatus(notification, this.notifications);
    this.notificationService.updateNotificationAsRead(notification);
  }

  private updateReadStatus(toUpdate: Notification, notificationList: Notification[]) : void {
    notificationList.forEach((notification,idx) => {
      if (notification.id == toUpdate.id) {
        notificationList.splice(idx, 1);
      }
    })
  }

}

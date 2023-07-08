import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/models/notification/notification';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css']
})
export class NotificationMessageComponent {
  constructor(private notificationService: NotificationService) {}

  // incoming attributes required to display data within the view
  @Input() notifications!: Notification[];
  @Input() activeNotificationType!: string;


  // updates the notification status as read
  updateNotificationAsRead(notification: Notification) : void {
    this.updateReadStatus(notification, this.notifications);
    this.notificationService.updateNotificationAsRead(notification.id);

    // send an update to the service that the message panel is empty
    if (this.getMessageCount(notification.name, this.notifications) <= 0) {
      this.notificationService.raiseMessagePanelIsEmpty(true);
    }

  }

  // counts tthe number of messages remaining
  private getMessageCount(notificationType: string, notifications: Notification[]) : number {
    return notifications.filter(notification => notification.name === notificationType).length;
  }

  // update or remove the message having been read
  private updateReadStatus(notification: Notification, notifications: Notification[]) : void {
    notifications.forEach((currNotification,idx) => {
      if (currNotification.id == notification.id) {
        this.notifications.splice(idx, 1);
      }
    })
  }

}

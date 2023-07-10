import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from 'src/app/models/notification/notification';
import { NotificationService } from 'src/app/services/notification/notification.service';


const data = { 
  "id": "ddb5130d-dce0-416e-95d6-f8fc782cd0ad", 
  "message": "User TNavarrete1 followed you", 
  "viewed": false, 
  "link": "user:dbf6bb34-59f4-42a8-9626-dff4a233f73e", 
  "createTime": "2023-07-08T16:11:25.482+00:00", 
  "username": "phoutester001", 
  "notificationType": "follow" 
};


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
  @Output() totalUnreadChange = new EventEmitter<void>();

  formatMessage(message: string) : string {
    let clippedMessage = message.substring(message.indexOf("User ")+5);
    return clippedMessage.charAt(0).toUpperCase() + clippedMessage.substring(1) + ".";
  }

  // updates the notification status as read
  updateNotificationAsRead(notification: Notification) : void {
    this.updateReadStatus(notification, this.notifications);
    this.notificationService.updateNotificationAsRead(notification).subscribe({
      next: (res) => this.totalUnreadChange.emit(),
      error: (err) => console.log(err.error.message),
      complete: () => null
    });

    // send an update to the service that the message panel is empty
    if (this.getMessageCount(notification.matIconName, this.notifications) <= 0) {
      this.notificationService.raiseMessagePanelIsEmpty(true);
    }

  }

  // counts tthe number of messages remaining
  private getMessageCount(notificationType: string, notifications: Notification[]) : number {
    return notifications.filter(notification => notification.matIconName === notificationType).length;
  }

  // update or remove the message having been read
  private updateReadStatus(notification: Notification, notifications: Notification[]) : void {
    notifications.forEach((currNotification,idx) => {
      if (currNotification.id == notification.id) {
        this.notifications[idx].hasRead = true;
        this.notifications.splice(idx, 1);
      }
    })
  }

}

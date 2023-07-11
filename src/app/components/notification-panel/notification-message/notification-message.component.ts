import { Component, Input } from '@angular/core';
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

  // incoming attributes for displaying data within the view
  @Input() notifications!: Notification[];
  @Input() activeNotificationType!: string;

  // formats the notification message
  formatMessage(message: string) : string {
    return message.charAt(0).toUpperCase() + message.substring(1) + ".";
  }

  // updates the notification status as read
  updateAsViewed(notification: Notification) : void {

    // call service to update, then do local updates
    this.notificationService.httpUpdateAsViewed(notification).subscribe({
      next: (res) => {
        // remove el; close message panel when zero
        this.removeNotification(notification, this.notifications);
        if (this.getTypeMessageCount(notification.matIconName, this.notifications) <= 0) {
          this.notificationService.raiseMessagePanelIsEmpty(true);
        }
      },
      error: (err) => console.log(err.error.message)
    });

  }

  // counts tthe number of messages remaining
  private getTypeMessageCount(notificationType: string, notifications: Notification[]) : number {
    return notifications.filter(notification => notification.matIconName === notificationType).length;
  }

  // update or remove the message having been read
  private removeNotification(notification: Notification, notifications: Notification[]) : void {
    notifications.forEach((currNotification,idx) => {
      if (currNotification.id == notification.id) {
        this.notifications.splice(idx, 1); // remove the notification from the list
      }
    })
  }

}

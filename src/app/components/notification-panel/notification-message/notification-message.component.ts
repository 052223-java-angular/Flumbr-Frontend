import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from 'src/app/models/notification/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css']
})
export class NotificationMessageComponent {
  @Input() notifications: Notification[] = [];
  @Input() activeNotificationType: string = '';
  @Input() isHorizontal!: boolean;
  @Output() messageChange = new EventEmitter<boolean>();
  
  constructor(private notificationService: NotificationService) {}

  // updates the notification status as read
  updateNotificationAsRead(notification: Notification) : void {
    this.updateReadStatus(notification, this.notifications);
    this.notificationService.updateNotificationAsRead(notification);
    // need to @Output this event to close the panel when list is zero
    // need to updatePanelState to closed
    const messageCount = this.getMessageCount(notification.type, this.notifications);
    if (messageCount <= 0) {
      console.log(messageCount);
      this.messageChange.emit(false);
    }
  }

  getMessageCount(notificationType: string, notifications: Notification[]) : number {
    return notifications.filter(notification => notification.type === notificationType).length;
  }


  private updateReadStatus(toUpdate: Notification, notifications: Notification[]) : void {
    notifications.forEach((notification,idx) => {
      if (notification.id == toUpdate.id) {
        notifications.splice(idx, 1);
      }
    })
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationPayload } from 'src/app/models/notification/notification-payload';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {  
  iconList: string[] = ['home', 'show_chart', 'comment', 'rate_review', 'thumb_up', 'person_add', 'message'];
  comments: NotificationPayload[] = [];
  trending: NotificationPayload[] = [];
  message: NotificationPayload[] = [];
  reviews: NotificationPayload[] = [];
  likes: NotificationPayload[] = [];
  panelOpenState: boolean = true;
  notifications$!: Observable<NotificationPayload[]>;
  panelId: number = -1;

  @Output() opened = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();


  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}

  openNotification(idx: number) : void {
    // pull notification messages
    this.panelId = idx;
    this.notifications$ = this.notificationService.fetchNotifications();
    this.opened.emit(true);
  }

  closeNotification(idx: number) : void {
    // pull notification messages
    this.panelId = -1;
    this.closed.emit(false);
  }

}

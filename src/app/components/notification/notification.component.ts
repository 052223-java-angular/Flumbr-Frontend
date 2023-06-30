import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { INotification } from 'src/app/models/INotification';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  panelOpenState = false;
  notifications$!: Observable<INotification[]>;
  notificationTally: number = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() : void {
    this.notifications$ = this.notificationService.fetchNotifications();
  }

  hasRead() : void {
    // when notifications are read, reduce the indicator count

  }


}

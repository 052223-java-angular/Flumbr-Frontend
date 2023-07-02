import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ThemePalette } from '@angular/material/core';
import { MatBadgeSize } from '@angular/material/badge';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() badgeContent: string | number | undefined | null;
  @Input() icon: string | undefined | null;
  @Input() badgeColor: ThemePalette;
  @Input() badgeSize: MatBadgeSize = "small";
  @Input() tabIsActive: boolean = false;



  
  // panelOpenState = false;
  // notifications$!: Observable<INotification[]>;
  // notificationTally: number = 0;


  constructor(private notificationService: NotificationService) {}

  ngOnInit() : void {
    // this.notifications$ = this.notificationService.fetchNotifications();
  }

}

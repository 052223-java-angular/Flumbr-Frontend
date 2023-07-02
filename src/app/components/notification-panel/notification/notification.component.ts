import { Component, Input, OnInit } from '@angular/core';
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
  @Input() badgeColor: ThemePalette = 'primary';
  @Input() badgeSize: MatBadgeSize = "small";
  @Input() tabIsActive: boolean = false;
  @Input() panelOpenState: boolean = false;

  constructor() {}

  ngOnInit() : void {}

}

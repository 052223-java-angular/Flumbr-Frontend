import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatBadgeSize } from '@angular/material/badge';


@Component({
  selector: 'app-notification-type',
  templateUrl: './notification-type.component.html',
  styleUrls: ['./notification-type.component.css'],
})
export class NotificationTypeComponent implements OnInit {
  @Input() badgeContent: string | number | undefined | null;
  @Input() matIcon: string | undefined | null;
  @Input() badgeColor: ThemePalette = 'primary';
  @Input() badgeSize: MatBadgeSize = "small";
  @Input() tabIsActive: boolean = false;

  constructor() {}

  ngOnInit() : void {}

}

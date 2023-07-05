import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatBadgeSize } from '@angular/material/badge';


@Component({
  selector: 'app-notification-type',
  templateUrl: './notification-type.component.html',
  styleUrls: ['./notification-type.component.css'],
})
export class NotificationTypeComponent {

  // attributes required for displaying icons and badges
  @Input() badgeContent: string | number | undefined | null;
  @Input() matIcon: string | undefined | null;
  @Input() badgeColor: ThemePalette = 'primary';
  @Input() badgeSize: MatBadgeSize = "small";
  @Input() activeNotificationType!: string;

}

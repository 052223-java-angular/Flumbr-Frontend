import { Component, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TokenService } from 'src/app/services/tokenservice.service';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css'],
})
export class PostsContainerComponent {
  @Input() userId!: string;
  loggedInUserId = this.tokenService.getUser().id;

  constructor(
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) {}

  activeTab: string = 'default';

  activateTab(changeEvent: MatTabChangeEvent) {
    const txtLabel = changeEvent.tab.textLabel;
    if (txtLabel == 'Feed' || txtLabel == 'Posts') {
      this.activeTab = 'default';
    } else {
      this.activeTab = changeEvent.tab.textLabel;
    }
    this.notificationService.raiseStateIsReloading(true);
  }
}

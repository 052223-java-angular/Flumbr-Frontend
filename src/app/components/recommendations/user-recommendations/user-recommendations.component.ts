import { Component, OnInit } from '@angular/core';
import { FollowService } from '../../../services/follow/follow.service';
import { ProfileService } from '../../../services/profile-service';
import { TokenService } from '../../../services/tokenservice.service';
import { Observable, Subscription } from 'rxjs';
import { PotentialFollowRequestPayload } from '../../../models/potential-follow-request-payload';
import { AppSettings } from '../../../global/app-settings';
import { MessageService } from 'primeng/api';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from 'src/app/global/event-bus-events';

@Component({
  selector: 'app-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent implements OnInit {
  users: any = [];
  tags: any = [];
  sessionId: any;
  followSub: Subscription;

  constructor(
    private followService: FollowService,
    private profileService: ProfileService,
    private tokenService: TokenService,
    private messageService: MessageService,
    private eventBus: NgEventBus
  ) {
    this.followSub = this.eventBus
      .on(`${EventBusEvents.FOLLOW}*`)
      .subscribe(() => {
        const tagNames: string[] = this.tags.map((tag: any) => tag.name);
        this.getRecommendedFollowers(tagNames);
      });
  }

  ngOnInit(): void {
    try {
      this.sessionId = this.tokenService.getUser().id;
      this.profileService.getUser(this.sessionId).subscribe((data: any) => {
        console.log(data.profileId);
        const profile_id = data.profileId;
        console.log(profile_id);
        this.getUserTags(profile_id);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  getUserTags(profile_id: any): void {
    this.profileService.getUserTags(profile_id).subscribe({
      next: (data: any) => {
        console.log(data.tags);
        this.tags = data.tags;
        const tagNames: string[] = this.tags.map((tag: any) => tag.name);
        this.getRecommendedFollowers(tagNames);
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
    });
  }

  async getRecommendedFollowers(tagNames: string[]) {
    const payload: PotentialFollowRequestPayload = {
      tagList: tagNames,
      userId: this.tokenService.getUser().id,
      username: this.tokenService.getUser().username,
    };

    this.followService.potentialFollowers(payload).subscribe({
      next: (data: any) => {
        console.log(data);
        this.followService.getFollowing().subscribe({
          next: (following) => {
            const loggedInUsername = this.tokenService.getUser().username; // Replace with the logged-in username
            const resultUsers: any[] = data.filter((user: any) => {
              //exclude the user
              if (user.username === loggedInUsername) {
                return false;
              }
              // Exclude the users already being followed
              return !following.includes(user.username);
            });
            this.users = resultUsers;
            console.log(resultUsers);
          },
          error: (error) => {},
        });
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
    });
  }

  followUser(username: string) {
    this.followService.httpFollow(username).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Successfully followed ${username}`,
        life: AppSettings.DEFAULT_MESSAGE_LIFE,
      });
      const tagNames: string[] = this.tags.map((tag: any) => tag.name);
      this.getRecommendedFollowers(tagNames);
    });
  }
}

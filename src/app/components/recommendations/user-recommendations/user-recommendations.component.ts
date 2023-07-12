import { Component, OnInit } from '@angular/core';
import { FollowService } from "../../../services/follow/follow.service";
import { ProfileService } from "../../../services/profile-service";
import { TokenService } from "../../../services/tokenservice.service";
import { Observable } from "rxjs";
import {PotentialFollowRequestPayload} from "../../../models/potential-follow-request-payload";
import {AppSettings} from "../../../global/app-settings";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent implements OnInit {
  users: any = [];
  tags: any = [];
  sessionId: any;

  constructor(
    private followService: FollowService,
    private profileService: ProfileService,
    private tokenService: TokenService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    try {
      this.sessionId = this.tokenService.getUser().id
      this.profileService.getUser(this.sessionId).subscribe((data: any) => {
        console.log( data.profileId);
        const profile_id =data.profileId;
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
      }
    });
  }

  getRecommendedFollowers(tagNames: string[]) {
    const payload: PotentialFollowRequestPayload = {
      tagList: tagNames,
      userId: this.tokenService.getUser().userId,
      username:this.tokenService.getUser().username
    };

    console.log(payload);
    this.followService.potentialFollowers(payload).subscribe({
      next: (data: any) => {
        console.log(data);

        const loggedInUsername = this.tokenService.getUser().username; // Replace with the logged-in username
        console.log(loggedInUsername);

        const resultUsers: any[] = data.filter((user: any) => {

          //exclude the user
          if (user.username === loggedInUsername) {
            return false;
          }

          // Exclude the users already being followed
          return !this.isAlreadyFollowing(user.username);
        });

        this.users = resultUsers;
        console.log(resultUsers);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  isAlreadyFollowing(username: string): boolean {
    let isFollowing = false;
    const followingUsernames$: Observable<string[]> = this.followService.httpGetIsFollowing();

    followingUsernames$.subscribe((followingUsernames: string[]) => {
      isFollowing = followingUsernames.includes(username);
    });

    return isFollowing;
  }

  followUser(username: string) {
    this.followService.httpFollow(username).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Successfully followed ${username}`,
        life: AppSettings.DEFAULT_MESSAGE_LIFE,
      });
    });
  }
}

import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { FollowService } from 'src/app/services/follow/follow.service';
import { TokenService } from 'src/app/services/tokenservice.service';

// declaring a view type for icon or text
type View = 'iconView' | 'textView';

// userId: the logged in user id
// followedUserId: the id of user the logged in user is going to follow
// followedUsername: the username of user the logged in user is going to follow
type FollowSubject = {
  loggedInUserId: string;
  ownerUserId: string;
  ownerUsername: string;
};

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  constructor(
    private followService: FollowService,
    private tokenService: TokenService,
    private eventBus: NgEventBus
  ) {}

  // assign the view type to display
  @Input() viewTemplate!: View;

  // for post type instance
  // implementor will need to create an object with fields matching the FollowSubject type
  @Input() followIdentity!: FollowSubject;

  // the usernames the user is
  isFollowingUsernames!: string[];

  // boolean variable used for toggling follow and unfollow actions
  // isFollowing: boolean = false;

  // for error
  hasFollowError: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.followService.httpGetIsFollowing().subscribe({
      next: (res) => {
        this.isFollowingUsernames = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // do not show follow or unfollow if owner of post is the logged in user
  isLoggedInOwner(followIdentity: FollowSubject): boolean {
    return (
      this.tokenService.getUser().username.toLowerCase() ==
      followIdentity.ownerUsername.toLowerCase()
    );
  }

  // determine whether the post is already followed by logged in user
  isFollowing(followIdentity: FollowSubject): boolean {
    return this.isFollowingUsernames.includes(followIdentity.ownerUsername);
  }

  // follow handler for follow and unfollow actions
  followHandler(followSubject: FollowSubject): void {
    this.hasFollowError = false;
    this.errorMessage = '';

    // make a one-time method call for the isFollowing boolean value
    const isFollowing = this.isFollowing(followSubject);

    // if not following, handle follow request
    if (!isFollowing) {
      // this.followService.httpFollow("phouFollower001").subscribe({
      this.followService.httpFollow(followSubject.ownerUsername).subscribe({
        next: (res: HttpResponse<any>) => {
          // console.log("following ...")
          // add the username to the list of followers
          this.isFollowingUsernames.push(followSubject.ownerUsername);
          this.eventBus.cast(EventBusEvents.FOLLOW_FOLLOW, '');
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.hasFollowError = !this.hasFollowError;
        },
        complete: () => null,
      });
    }
    // if following, handle unfollow request
    else if (isFollowing && !this.hasFollowError) {
      // this.followService.httpUnfollow("phouFollower001").subscribe({
      this.followService.httpUnfollow(followSubject.ownerUsername).subscribe({
        next: (res: HttpResponse<any>) => {
          // console.log("unfollowing ...")
          this.isFollowingUsernames.splice(
            this.isFollowingUsernames.indexOf(followSubject.ownerUsername),
            1
          );
          this.eventBus.cast(EventBusEvents.FOLLOW_UNFOLLOW, '');
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.hasFollowError = !this.hasFollowError;
        },
        complete: () => null,
      });
    }
  }
}

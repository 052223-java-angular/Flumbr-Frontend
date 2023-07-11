import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { Subscription } from 'rxjs';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { PostRes } from 'src/app/models/post/post';
import { FollowService } from 'src/app/services/follow/follow.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-following-posts',
  templateUrl: './following-posts.component.html',
  styleUrls: ['./following-posts.component.css'],
})
export class FollowingPostsComponent implements OnInit, OnDestroy {
  posts: Array<PostRes> = [];
  isLoading = false;
  followingSubscription!: Subscription;
  postSub: Subscription;

  constructor(
    private postService: PostService,
    private followService: FollowService,
    private eventBus: NgEventBus
  ) {
    this.postSub = this.eventBus.on(`${EventBusEvents.POST}*`).subscribe(() => {
      this.getPosts(1);
    });
  }

  ngOnInit(): void {
    this.getPosts(1);

    // subscribe to following behavior subject
    this.followingSubscription = this.followService
      .getDeletedFollowBehaviorSubject()
      .subscribe({
        next: (unfollowedUsername) => {
          // avoids rest of code when post is not initialized
          if (this.posts.length == 0) {
            return;
          }

          // animates and deletes posts of unfollowed user
          const filteredPosts: Array<PostRes> = [];
          this.posts = this.posts.map((post) => {
            if (post.username == unfollowedUsername) {
              // animate delete
              post.animateDelete = true;
            } else {
              filteredPosts.push(post);
            }

            return post;
          });

          // delete unfollowed posts
          window.setTimeout(() => {
            this.posts = filteredPosts;
          }, 500);
        },
      });
  }

  ngOnDestroy() {
    this.followingSubscription.unsubscribe();
  }

  getPosts(page: number) {
    this.isLoading = true;
    this.postService.getFollowingPosts(page).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.posts = res;
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}

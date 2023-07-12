import { Component, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { Subscription } from 'rxjs';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css'],
})
export class FeedPostsComponent implements OnInit {
  posts!: Array<PostRes>;
  isLoading = false;
  postSub: Subscription;

  // scroll
  isLoadingMorePosts = false;
  page = 1;
  postsPerPage = 20;
  maxPostsReached = false;
  scrollDistance = 2;
  scrollThrottle = 150;

  constructor(private postService: PostService, private eventBus: NgEventBus) {
    this.postSub = this.eventBus.on(`${EventBusEvents.POST}*`).subscribe(() => {
      this.getPosts();
    });
  }

  ngOnInit(): void {
    this.getPosts();
  }

  onScroll() {
    // checks if no more posts available from db
    if (this.maxPostsReached || this.isLoadingMorePosts) {
      console.log('max reached');
      return;
    }

    console.log('scroll');
    this.page += 1;
    this.getMorePosts(this.page);
  }

  getPosts() {
    this.isLoading = true;
    this.postService.getFeedPosts(1).subscribe({
      next: (res) => {
        this.posts = res;

        // no more posts available from db
        if (res.length < this.postsPerPage) {
          this.maxPostsReached = true;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  getMorePosts(page: number) {
    this.isLoadingMorePosts = true;
    this.postService.getFeedPosts(page).subscribe({
      next: (res) => {
        console.log('success');
        this.posts.push(...res);

        // no more posts available from db
        if (res.length < this.postsPerPage) {
          this.maxPostsReached = true;
        }

        this.isLoadingMorePosts = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoadingMorePosts = false;
      },
    });
  }
}

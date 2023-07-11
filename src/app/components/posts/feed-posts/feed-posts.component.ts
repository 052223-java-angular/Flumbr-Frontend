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

  constructor(private postService: PostService, private eventBus: NgEventBus) {
    this.postSub = this.eventBus.on(`${EventBusEvents.POST}*`).subscribe(() => {
      this.getPosts(1);
    });
  }

  ngOnInit(): void {
    this.getPosts(1);
  }

  getPosts(page: number) {
    this.isLoading = true;
    this.postService.getFeedPosts(page).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.posts = res;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MetaData, NgEventBus } from 'ng-event-bus';
import { Subscription } from 'rxjs';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-trending-posts',
  templateUrl: './trending-posts.component.html',
  styleUrls: ['./trending-posts.component.css'],
})
export class TrendingPostsComponent implements OnInit {
  posts!: Array<PostRes>;
  isLoading = false;
  postSub: Subscription;

  constructor(private postService: PostService, private eventBus: NgEventBus) {
    this.postSub = this.eventBus
      .on(`${EventBusEvents.POST}*`)
      .subscribe((metaData: MetaData) => {
        this.getPosts();
      });
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.isLoading = true;
    this.postService.getTrendingPosts('2022-03-01').subscribe({
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
  // searchByUsername(username: string): Array<PostRes> {
  //   let postsByUser: Array<PostRes> = [];
  //   for (let post of this.posts) {
  //     if (post.username === username) {
  //       postsByUser.push(post);
  //     }
  //   }
  //   return postsByUser;
  // }
  // searchByTags(tagName: string): Array<PostRes> {
  //   let postsByTag: Array<PostRes> = [];
  //   for (let post of this.posts) {
  //     if (post.tags !== undefined) {
  //       for (let tag of post.tags) {
  //         if (tag.name === tagName) {
  //           postsByTag.push(post);
  //         }
  //       }
  //     }
  //   }
  //   return postsByTag;
  // }
  // deletePostById(id: string) {
  //   for (let post of this.posts) {
  //     if (post.id === id) {
  //       this.postService.deletePostById(id);
  //     }
  //   }
  // }
  // editPostById(id: string, content: string) {
  //   for (let post of this.posts) {
  //     if (post.id == id) {
  //       if (post.message !== undefined) {
  //         post.message = content;
  //         return post;
  //       }
  //     }
  //   }
  //   return undefined;
  // }
}

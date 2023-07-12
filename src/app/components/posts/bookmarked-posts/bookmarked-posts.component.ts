import { Component, OnInit } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-bookmarked-posts',
  templateUrl: './bookmarked-posts.component.html',
  styleUrls: ['./bookmarked-posts.component.scss'],
})
export class BookmarkedPostsComponent implements OnInit {
  posts: Array<PostRes> = [];
  isLoading = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  getPosts() {
    this.isLoading = true;
    this.postService.getBookmarkedPosts().subscribe({
      next: (res) => {
        this.posts = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}

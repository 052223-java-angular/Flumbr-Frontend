import { Component, OnInit } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-following-posts',
  templateUrl: './following-posts.component.html',
  styleUrls: ['./following-posts.component.css'],
})
export class FollowingPostsComponent implements OnInit {
  posts!: Array<PostRes>;
  isLoading = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts(1);
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

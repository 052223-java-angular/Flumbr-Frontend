import { Component, Input, OnInit } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts!: Array<PostRes>;
  @Input() type: string = 'all';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: (res) => {
        this.posts = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

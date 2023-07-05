import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent {
  @Input() post!: PostRes;

  constructor(private postService: PostService) {}

  navigateToTag(id: string) {
    console.log(id);
  }

  navigateToUser(id: string) {
    console.log(id);
  }

  likePost(id: string) {
    console.log(id);
  }

  dislikePost(id: string) {
    console.log(id);
  }

  sharePost() {
    console.log('sharing');
  }

  openChat() {
    console.log('opening chat');
  }

  reportPost(postId: string): void {
    // does this need to make a network request ?
  }
}

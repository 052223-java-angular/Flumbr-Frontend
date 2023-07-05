import { Component, Input } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { FollowService } from 'src/app/services/follow/follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent {
  @Input() post!: PostRes;
  hasReported = false;

  constructor(private followService: FollowService) {}

  followUser(id: string) : void {
    if (this.post.userId == id) {
      this.post.following = true;
    }
  }

  unFollowUser(id: string) : void {
    if (this.post.userId == id) {
      this.post.following = false;
    }
  }

  reportPost(postId: string) : void {
    this.hasReported = !this.hasReported;
    // does this need to make a network request ?
    this.followService.reportPost(postId);
  }

}

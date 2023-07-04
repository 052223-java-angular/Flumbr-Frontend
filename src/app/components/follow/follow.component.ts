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

}

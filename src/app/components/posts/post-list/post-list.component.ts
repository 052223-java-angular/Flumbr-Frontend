import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRes } from 'src/app/models/post/post';
import { FollowService } from 'src/app/services/follow/follow.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  constructor(private followService: FollowService) {}

  // need to gets the followers of the users and pass down its values into each post component
  ngOnInit(): void {
      this.followService.httpGetIsFollowing().subscribe((resData) => {
        this.isFollowingUsernames = resData;
        console.log("fetching following usernames");
      });
  }

  @Input() posts!: Array<PostRes>;
  isFollowingUsernames!: string[];

}

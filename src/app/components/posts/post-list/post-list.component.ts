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
  @Input() posts!: Array<PostRes>;
}

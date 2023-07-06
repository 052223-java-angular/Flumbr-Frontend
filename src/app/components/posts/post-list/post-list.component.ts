import { Component, Input } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  @Input() posts!: Array<PostRes>;
}

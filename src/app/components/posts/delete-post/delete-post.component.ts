import { Component, Input } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { MessageService } from 'primeng/api';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from 'src/app/global/event-bus-events';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss'],
})
export class DeletePostComponent {
  @Input()
  post!: PostRes;

  constructor(
    private postservice: PostService,
    private messageservice: MessageService,
    private eventBus: NgEventBus
  ) {}

  deletePost(post_id: string) {
    console.log('in deletePost method');
    this.postservice.deletePost(post_id).subscribe({
      next: (val) => {
        console.log(val);
        this.eventBus.cast(EventBusEvents.POST_DELETE, '');
        this.messageservice.add({
          severity: 'success',
          summary: 'Post Deleted',
          detail: 'Your post has been deleted',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

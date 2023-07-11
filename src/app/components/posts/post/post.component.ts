import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { ReportComponent } from '../../report/report.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent {
  @Input() post!: PostRes;
  isChatOpen = false;

  constructor(private postService: PostService, private dialog: MatDialog) {}

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

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  reportPost(id: any) {
    console.log(id);
    this.dialog.open(ReportComponent,{
      width: '40%',
      data:{
        id: id,
      }
    })
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css'],
})
export class ViewPostsComponent {
  constructor(private dialog: MatDialog) {}

  openPostDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '600px',
      maxHeight: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}

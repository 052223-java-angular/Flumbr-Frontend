import { Component, Input } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog'


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent {
  @Input() 
  post! : PostRes
  updatedMessage : string = ""
  @Input()
  mediaType!: string


  constructor(private postservice: PostService){}

  updatePost(updatedMessage:string, mediaType:string)
  {
      this.postservice.updatePost(this.post.id, updatedMessage, mediaType);
  }



}

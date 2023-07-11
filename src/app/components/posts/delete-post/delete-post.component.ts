import { Component, Input } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent {
   @Input()
   post!: PostRes

   constructor(private postservice: PostService, private messageservice: MessageService){}

   deletePost(post_id:string)
   {
      console.log("in deletePost method");
      this.postservice.deletePost(post_id).subscribe({
          next: (val) => {
            console.log(val);
            this.messageservice.add({

            })
            
          },
          error: (err) => {
              console.log(err);
          }
      })
   }
}

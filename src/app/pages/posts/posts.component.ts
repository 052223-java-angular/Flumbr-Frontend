import { Component, Input, OnInit } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts!: Array<PostRes>;
  @Input() type: string = 'all';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: (res) => {
        this.posts = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchByUsername(username:string): Array<PostRes>
  {
    let postsByUser: Array<PostRes> = []
      for(let post of this.posts)
      {
         if(post.username === username)
         {
            postsByUser.push(post);
         }
      }

      return postsByUser;
  }

  searchByTags(tagName:string): Array<PostRes>
  {
      let postsByTag: Array<PostRes> = [];

      for(let post of this.posts)
      {
        if(post.tags !== undefined)
        {
          for(let tag of post.tags)
          {
            if(tag.name === tagName)
            {
              postsByTag.push(post);
            }
          }
        }
      }
     return postsByTag;
  }

  deletePostById(id:string)
  {
      for(let post of this.posts)
      {
          if(post.id === id)
          {
              this.postService.deletePostById(id);
          }
      }
  }
}

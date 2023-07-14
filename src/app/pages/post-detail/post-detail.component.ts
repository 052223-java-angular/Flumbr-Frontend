import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    const urlParts = this.router.url.split("/");
    this.post$ = this.postService.httpGetPostById(urlParts[urlParts.length-1]);
  }

  post$!: Observable<PostRes>;

}

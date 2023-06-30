import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostRes } from 'src/app/models/post/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: Array<PostRes> = [
    {
      username: 'John Doe',
      profileImg:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      message: 'Hello guys this is my first post',
      tags: [{ name: 'cute' }, { name: 'fluffy' }],
    },
    {
      username: 'Rachel453',
      profileImg:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      message: 'Taking a long awaited vacation',
      s3bucket:
        'https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80',
      mediaType: 'image',
      tags: [{ name: 'vacation' }],
    },
    {
      username: 'oliengreen89',
      profileImg:
        'https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      s3bucket: '../../../assets/videos/toilet-funny.mp4',
      mediaType: 'video',
      tags: [{ name: 'funny' }],
    },
  ];

  constructor() {}

  getPosts(): Observable<Array<PostRes>> {
    return of(this.posts);
  }
}

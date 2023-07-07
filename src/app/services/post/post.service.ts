import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { PostRes } from 'src/app/models/post/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = AppSettings.API_URL;

  posts: Array<PostRes> = [
    {
      id: '1',
      userId: '1',
      username: 'John Doe',
      profileImg:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      message: 'Hello guys this is my first post',
      tags: [
        { id: '1', name: 'cute' },
        { id: '2', name: 'fluffy' },
      ],
      following: false,
      createTime: '2003-04-13',
    },
    {
      id: '2',
      userId: '2',
      username: 'Rachel453',
      profileImg:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      message: 'Taking a long awaited vacation',
      s3bucket:
        'https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80',
      mediaType: 'image',
      tags: [
        { id: '3', name: 'vacation' },
        { id: '4', name: 'landscape photo' },
        { id: '5', name: 'city life' },
        { id: '6', name: 'sunset' },
        { id: '7', name: 'beautiful' },
      ],
      following: true,
      createTime: '2003-05-28',
    },
    {
      id: '3',
      userId: '3',
      username: 'oliengreen89',
      profileImg:
        'https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      s3bucket: '../../../assets/videos/toilet-funny.mp4',
      mediaType: 'video',
      tags: [{ id: '8', name: 'funny' }],
      following: false,
      createTime: '2020-12-23',
    },
  ];

  constructor(private http: HttpClient) {}

  // for dummy data
  getPosts(): Observable<Array<PostRes>> {
    return of(this.posts);
  }

  // feed posts from db
  getFeedPosts(page: number): Observable<Array<PostRes>> {
    return this.http.get<any>(`${this.baseUrl}/posts/feed/${page}`);
  }

  // following posts from db
  getFollowingPosts(page: number): Observable<Array<PostRes>> {
    return this.http.get<any>(`${this.baseUrl}/posts/following/${page}`);
  }

  // trending posts from db
  getTrendingPosts(date: string): Observable<Array<PostRes>> {
    return this.http.get<any>(`${this.baseUrl}/posts/trending/${date}`);
  }

  deletePostById(id: string) {
    this.posts.map((post) => {
      if (post.id === id) {
        this.posts.splice(this.posts.indexOf(post), 1);
      }
      return post;
    });
  }

  createPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/posts/create`, formData);
  }
}

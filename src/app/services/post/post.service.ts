import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { PostRes } from 'src/app/models/post/post';
import { Vote } from 'src/app/models/post/vote';
import { Bookmark } from '../../models/post/bookmark';
import { Tag } from 'src/app/models/tag/tag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = AppSettings.API_URL;

  posts: Array<PostRes> = [
    {
      id: '1',
      upVotes: 2,
      downVotes: 10,
      username: 'John Doe',
      profileImg:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      message: 'Hello guys this is my first post',
      tags: [
        { id: '1', name: 'cute' },
        { id: '2', name: 'fluffy' },
      ],
      createTime: '2003-04-13',
      userVote: {
        id: '3b92acce-d527-413d-af5d-f7ea8ea1ef58',
        vote: true,
        username: null,
      },
    },

    {
      id: '2',
      upVotes: 100,
      downVotes: 1,
      username: 'Rachel453',
      profileImg:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      message: 'Taking a long awaited vacation',
      s3Url:
        'https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80',
      mediaType: 'image',
      tags: [
        { id: '3', name: 'vacation' },
        { id: '4', name: 'landscape photo' },
        { id: '5', name: 'city life' },
        { id: '6', name: 'sunset' },
        { id: '7', name: 'beautiful' },
      ],
      createTime: '2003-05-28',
      userVote: {
        id: '3b92acce-d527-413d-af5d-f7ea8ea1ef58',
        vote: true,
        username: null,
      },
    },
  ];

  constructor(private http: HttpClient) {}

  // for dummy data
  getPosts(): Observable<Array<PostRes>> {
    return of(this.posts);
  }

  // feed posts from db
  getFeedPosts(page: number): Observable<Array<PostRes>> {
    // return this.http.get<PostRes[]>("/assets/posts/posts.json");
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

  getFeed(page: number): Observable<Array<PostRes>> {
    let url: string = environment.apiBaseUrl + '/feed/{{page}}';

    return this.http.get<Array<PostRes>>(url);
  }
  getPostsByUserId(user_id: string): Observable<Array<PostRes>> {
    let url: string = environment.apiBaseUrl + '/posts/user/{{user_id}}';

    return this.http.get<Array<PostRes>>(url);
  }

  getPostsByTagname(tags: Tag[], pageNum: number): Observable<Array<PostRes>> {
    let url: string = environment.apiBaseUrl + '/posts/tag/{{pagenum}}';
    let tagString: string = '';

    for (let tag of tags) {
      tagString += tag.name;
      tagString += ', ';
    }

    let params = new HttpParams();

    params = params.append('tags', tagString);

    return this.http.get<Array<PostRes>>(url, { params: params });
  }

  getPostById(postId: string): Observable<PostRes> {
    let url: string = environment.apiBaseUrl + '/id/{{postId}}';

    return this.http.get<PostRes>(url);
  }

  getTrendingByDate(
    fromDate: Date,
    userId: string
  ): Observable<Array<PostRes>> {
    let url: string =
      environment.apiBaseUrl +
      "/{{fromDate.toISOString().split('T')[0]}}/{{userId}}";

    return this.http.get<Array<PostRes>>(url);
  }

  createPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/posts/create`, formData);
  }

  /**
   * @param payload -
   */
  votePost(payload: Vote): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/vote/post`, payload);
  }

  /**
   * @param payload -
   */
  likePost(payload: Vote): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/vote/post`, payload);
  }

  bookmarkPost(payload: Bookmark): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/vote/post`, payload);
  }

  updatePost(id: string, formData: FormData) {
    return this.http.put(`${this.baseUrl}/posts/id/${id}`, formData, {
      responseType: 'text',
    });
  }

  reportPost(data: any) {
    return this.http.post(`${this.baseUrl}/reports`, data);
  }
}

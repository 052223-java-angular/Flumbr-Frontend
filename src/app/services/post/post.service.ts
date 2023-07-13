import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { PostRes } from 'src/app/models/post/post';
import { Vote } from 'src/app/models/post/vote';
import { Bookmark } from '../../models/post/bookmark';
import { RemoveBookmark } from '../../models/post/removeBookmark';
import { Tag } from 'src/app/models/tag/tag';
import { environment } from 'src/environments/environment';
import { NewCommentReq } from 'src/app/models/post/comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = AppSettings.API_URL;

  constructor(private http: HttpClient) {}

  // get a post by its id
  httpGetPostById(postId: string): Observable<PostRes> {
    return this.http.get<any>(`${this.baseUrl}/posts/id/${postId}`);
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
    let url: string = environment.apiBaseUrl + `/posts/feed/${page}`;

    return this.http.get<Array<PostRes>>(url);
  }

  getPostsByUserId(user_id: string): Observable<Array<PostRes>> {
    let url: string = environment.apiBaseUrl + `/posts/user/${user_id}`;

    return this.http.get<Array<PostRes>>(url);
  }

  getPostsByTagname(tags: Tag[], pageNum: number): Observable<Array<PostRes>> {
    let url: string = environment.apiBaseUrl + `/posts/tag/${pageNum}`;
    let tagString: string = '';

    for (let i = 0; i < tags.length; i++) {
      tagString += tags[i].name;

      if (i !== tags.length - 1) {
        tagString += ', ';
      }
    }

    let params = new HttpParams();

    params = params.append('tags', tagString);

    return this.http.get<Array<PostRes>>(url, { params: params });
  }

  getPostsByTag(tags: string[], pageNum: number): Observable<Array<PostRes>> {
    let tagString: string = '';

    for (let tag of tags) {
      tagString += tag;
      tagString += ',';
    }
    console.log('tagSTring is ' + tagString);

    let params = new HttpParams();

    params = params.append('tags', tagString);

    return this.http.get<Array<PostRes>>(
      `${this.baseUrl}/posts/tag/${pageNum}`,
      { params: params }
    );
  }

  getPostById(postId: string): Observable<PostRes> {
    let url: string = environment.apiBaseUrl + `/posts/id/${postId}`;

    return this.http.get<PostRes>(url);
  }

  getTrendingByDate(
    fromDate: Date,
    userId: string
  ): Observable<Array<PostRes>> {
    let date = fromDate.toISOString().slice(0, 10);
    let url: string =
      environment.apiBaseUrl + `/posts/trending/${new Date(date)}`;

    return this.http.get<Array<PostRes>>(url);
  }

  getBookmarkedPosts(): Observable<Array<PostRes>> {
    return this.http.get<any>(`${this.baseUrl}/posts/bookmarked`);
  }

  deletePost(postId: string) {
    const url: string = environment.apiBaseUrl + `/posts/id/${postId}`;
    return this.http.delete(url, {
      responseType: 'text',
    });
  }

  /*updatePost(post_id:string formData:FormData):Observable<any>
  {
     let url = environment.apiBaseUrl + `/posts/id/${post_id}`;

      let formData:FormData = new FormData();

      formData.append("message", message);

      formData.append("mediaType", mediaType);

      return this.http.put<any>(url, formData);

  }*/

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
    return this.http.post<any>(`${this.baseUrl}/bookmark/addBookmark`, payload);
  }

  removeBookmark(payload: RemoveBookmark): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/bookmark/removeBookmark`, {
      body: payload,
    });
  }

  updatePost(id: string, formData: FormData) {
    return this.http.put(`${this.baseUrl}/posts/id/${id}`, formData, {
      responseType: 'text',
    });
  }

  createComment(commentPayload: NewCommentReq): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/comment`, commentPayload);
  }

  deleteComment(id: string) {
    return this.http.delete(`${this.baseUrl}/posts/comments/${id}`);
  }

  reportPost(data: any) {
    return this.http.post(`${this.baseUrl}/reports`, data);
  }
}

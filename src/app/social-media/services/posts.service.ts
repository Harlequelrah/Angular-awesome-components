import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../../environments/environment';
import { PostCommentedEvent } from '../../core/types/postcommentedevent.type';

@Injectable()
export class PostsService {
  addNewComment(postCommentedEvent: PostCommentedEvent) {
    console.log(postCommentedEvent);
  }

  private baseUrl = environment.apiUrl+"/posts"
  constructor(private http: HttpClient) { }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${postId}`);
  }

  getPosts(): Observable<Post[]>
  {
    return this.http.get<Post[]>(`${this.baseUrl}/`);
  }
}

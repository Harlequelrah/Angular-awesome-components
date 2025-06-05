import { ResolveFn } from '@angular/router';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import {  inject } from '@angular/core';
import { PostsService } from '../services/posts.service';

export const postResolver: ResolveFn<Post> = (route, state) : Observable<Post> => {
  const postService = inject(PostsService);
  const postId : number  = Number(route.paramMap.get('postId'));
  return postService.getPost(postId);
};

export const postsResolver: ResolveFn<Post[]> = (route, state): Observable<Post[]> => {
  const postService = inject(PostsService);
  return postService.getPosts();
};

import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostCommentedEvent } from '../../../core/types/postcommentedevent.type';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{

  constructor(private route: ActivatedRoute, private postService : PostsService){}
  posts$!: Observable<Post[]>;

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(
        data => data['posts']
      )
    );
  }
  onPostCommented(postCommentedEvent: PostCommentedEvent) {
    this.postService.addNewComment(postCommentedEvent);
    }
}

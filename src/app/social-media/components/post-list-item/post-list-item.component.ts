import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostCommentedEvent } from '../../../core/types/postcommentedevent.type';

@Component({
  selector: 'app-post-list-item',
  standalone: false,
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent {
  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<PostCommentedEvent>();
  onNewComment(comment: string) {
    const postCommentedEvent = {comment:comment,postId:this.post.id}
    this.postCommented.emit(postCommentedEvent);
    console.log(comment);
  }


}

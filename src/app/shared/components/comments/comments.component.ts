import { Component, Input } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @Input() comments!: Comment[];
}

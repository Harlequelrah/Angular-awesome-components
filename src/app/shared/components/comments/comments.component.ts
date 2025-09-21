import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  animations: [
    trigger('listItem', [
      state('default', style({
        'background-color': 'white',
        'z-index': 1,
        'transform': 'scale(1)'
      })),
      state('active', style({
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2,
        'transform': 'scale(1.05)'
      })),
      transition('default => active', [animate('100ms ease-in-out')]),
      transition('active => default', [animate('500ms ease-in-out')])
    ])
  ]
})
export class CommentsComponent implements OnInit {
  onMouseLeave() {
    this.listItemStyleAnimation = 'default';
  }
  onMouseEnter() {
    this.listItemStyleAnimation = 'active';
  }
  listItemStyleAnimation: 'default' | 'active' = 'default';
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
  }
  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  LeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    }
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

}

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
      transition('active => default', [animate('500ms ease-in-out')]),
      transition('void => *', [style(
        {
          transform: 'translateX(-100%)',
          'background-color': 'rgb(201, 157, 242)',
          opacity: 0
        },
      ), animate('250ms ease-out', style({
        transform: 'translateX(0)',
        'background-color': 'white',
        opacity: 1
      }))])
    ])]
})
export class CommentsComponent implements OnInit {
  onMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
  onMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }
  animationStates: { [key: number]: 'default' | 'active' } = {};
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }
  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  LeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    })
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

}

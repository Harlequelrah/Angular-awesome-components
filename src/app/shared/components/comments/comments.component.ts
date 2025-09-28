import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';
@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(50, animateChild())
        ])
      ])
    ]),
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
      transition(':enter',
        [query('.comment-text,.comment-date', [style({ 'opacity': 0 })]),
        useAnimation(slideAndFadeAnimation, { params: { time: '250ms', startColor: 'rgb(201, 157, 242)' } }),
        group(
          [
            useAnimation(flashAnimation, { params: { time: '250ms', flashColor: 'lightblue' } }),
            query('.comment-text', [animate('250ms', style({ 'opacity': 1 }))]),
            query('.comment-date', [animate('500ms', style({ 'opacity': 1 }))])
          ]
        )
        ])
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

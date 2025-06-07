import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    CommentsComponent,
  ]
})
export class SharedModule { }

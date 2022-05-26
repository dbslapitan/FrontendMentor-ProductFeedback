import { Component, Input, OnInit } from '@angular/core';
import { UserComment } from 'src/app/shared/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment!: UserComment;

  constructor() { }

  ngOnInit(): void {
  }

}

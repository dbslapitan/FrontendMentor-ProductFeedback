import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserComment } from '../models/comment.model';
import { HttpRequestsService } from './http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentsSubject = new BehaviorSubject<UserComment[]>([]);

  constructor(private http: HttpRequestsService) { }

  updateComments(id: string){
    if(id !== undefined || id !== null){
      this.http.getComments(id).subscribe(response => {
        if(response){
          this.commentsSubject.next(response.data);
        }
      });
    }
  }
}

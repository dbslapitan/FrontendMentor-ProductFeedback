import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Feedback } from '../models/feedback.model';
import { User } from '../models/user.model';
import { UserComment } from '../models/comment.model';
import { UserHistory } from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private http: HttpClient) { }

  createAndPostFeedback(feedback: Feedback){
    return this.http.post<{success: boolean, message: string}>(environment.URI + "feedbacks", feedback);
  }

  createAndPostUser(user: User){
    const formData = new FormData();
    formData.append("username", user.username as string);
    formData.append("name", user.name as string);
    formData.append("password", user.password as string);
    formData.append("image", user.image as File, "image");
    return this.http.post<{success: boolean, data: object[]}>(environment.URI + "users", formData);
  }

  getAllFeedback(){
    return this.http.get<{success: boolean, data: object[]}>(environment.URI + "feedbacks");
  }
  
  getFeedback(id: string){
    return this.http.get<{success: boolean, data: Feedback}>(environment.URI + 'feedbacks/' + id);
  }

  checkUserAvailability(username: string){
    return this.http.get<{isFound: boolean}>(environment.URI + "users/check/" + username);
  }

  authenticateUser(credentials: {username: string, password: string}){
    return this.http.post<{success: boolean, data: {token?: string, username?: string, name?: string, userId?: string, imageURL?: string, extension?: string}}>(environment.URI + "users/login", credentials);
  }

  updateUpvotes(feedback: Feedback){
    return this.http.post<{success: boolean, message: string}>(environment.URI + "feedbacks/edit/" + feedback._id, feedback);
  }

  editFeedback(feedback: Feedback){
    return this.http.put<{success: boolean, message: string}>(environment.URI + "feedbacks/edit/" + feedback._id, feedback);
  }
  
  createAndPostComment(comment: UserComment){
    return this.http.post<{success: boolean, message: string}>(environment.URI + 'comments', comment);
  }

  getComments(id: string){
    return this.http.get<{success: boolean, data: UserComment[]}>(environment.URI + 'comments/' + id);
  }

  updateComment(comment: UserComment){
    return this.http.put<{success: boolean, message: string}>(environment.URI + 'comments/' + comment._id, comment);
  }

  getHistory(id: string){
    return this.http.get<{success: boolean, data: UserHistory}>(environment.URI + 'histories/' + id);
  }

  updateHistory(history: UserHistory){
    return this.http.put<{success: boolean, message: string}>(environment.URI + 'histories/' + history.userId, history);
  }

  deleteFeedback(id: string){
    return this.http.delete<{success: boolean,  message: string}>(environment.URI + 'feedbacks/' + id);
  }
}

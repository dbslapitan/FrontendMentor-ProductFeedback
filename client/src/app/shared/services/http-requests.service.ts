import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Feedback } from '../models/feedback.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private http: HttpClient) { }

  createAndPostFeedback(feedback: Feedback){
    return this.http.post<{success: boolean, message: string}>(environment.URI + "feedbacks", feedback);
  }

  createAndPostUser(user: User){
    return this.http.post<{success: boolean, data: object[]}>(environment.URI + "users", user);
  }

  getAllFeedback(){
    return this.http.get<{success: boolean, data: object[]}>(environment.URI + "feedbacks");
  }

  checkUserAvailability(username: string){
    return this.http.get<{isFound: boolean}>(environment.URI + "users/check/" + username);
  }

  authenticateUser(credentials: {username: string, password: string}){
    return this.http.post<{success: boolean, data: {token?: string, username?: string, name?: string, userId?: string}}>(environment.URI + "users/login", credentials);
  }
}

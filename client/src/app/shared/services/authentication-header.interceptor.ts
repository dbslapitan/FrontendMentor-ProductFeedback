import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const requestClone = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token} ${userId}`)
    });
    return next.handle(requestClone);
  }
}

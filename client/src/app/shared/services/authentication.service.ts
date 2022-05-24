import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() { }
}

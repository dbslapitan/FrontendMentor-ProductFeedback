import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  pagesSubject = new BehaviorSubject<string>("Home");

  constructor() { }
}

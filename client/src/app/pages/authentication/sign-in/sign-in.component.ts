import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css',
  './sign-in-tablet.component.css']
})
export class SignInComponent implements OnInit {

  invalid = false;

  signInForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, 
    private http: HttpRequestsService, 
    private router: Router, 
    private authService: AuthenticationService,
    private pagesService: PagesService) { }

  ngOnInit(): void {
    this.pagesService.pagesSubject.next('SignIn');
  }

  onSubmit(){
    this.http.authenticateUser(this.signInForm.getRawValue()).subscribe(response => {
      if(response.success){
        localStorage.setItem('name', response.data.name as string);
        localStorage.setItem('username', response.data.username as string);
        localStorage.setItem('token', response.data.token as string);
        localStorage.setItem('userId', response.data.userId as string);
        localStorage.setItem('imageURL', response.data.imageURL as string);
        localStorage.setItem('extension', response.data.extension as string);
        this.authService.isLoggedInSubject.next(true);
        this.router.navigate(['../']);
      }
      else{
        this.invalid = true;
      }
    });
  }

  resetError(){
    this.invalid = false;
  }

}

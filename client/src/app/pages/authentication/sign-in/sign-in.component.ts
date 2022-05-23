import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  invalid = false;

  signInForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private http: HttpRequestsService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.http.authenticateUser(this.signInForm.getRawValue()).subscribe(response => {
      if(response.success){
        localStorage.setItem('name', response.data.name as string);
        localStorage.setItem('username', response.data.username as string);
        localStorage.setItem('token', response.data.token as string);
        localStorage.setItem('userId', response.data.userId as string);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { usernameExistError, usernameFormatError } from 'src/app/shared/custom-validators/username-format-error.validator';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = this.formBuilder.group({
    username: ['', [Validators.required, usernameFormatError()], usernameExistError(this.http), {updateOn: 'blur'}],
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private http: HttpRequestsService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.http.createAndPostUser(this.signUpForm.getRawValue()).subscribe(response => {
      if(response.success){
        console.log('User successfully created...')
      }
    });
  }
}

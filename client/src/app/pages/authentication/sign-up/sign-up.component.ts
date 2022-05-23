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

  imgUrl: string = '';
  imgIsValid = false;
  imgHasSelected = false;

  signUpForm = this.formBuilder.group({
    username: ['', [Validators.required, usernameFormatError()], usernameExistError(this.http), {updateOn: 'blur'}],
    name: ['', Validators.required],
    password: ['', Validators.required],
    image: [null]
  });

  constructor(private formBuilder: FormBuilder, private http: HttpRequestsService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.signUpForm.value);
    /*this.http.createAndPostUser(this.signUpForm.getRawValue()).subscribe(response => {
      if(response.success){
        console.log('User successfully created...')
      }
    });*/
  }

  onImagePick(event: Event){
    const filePicker = (event.target as HTMLInputElement).files;
    let file: File;
    if(filePicker){
      file = filePicker[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
      //this.imgUrl = reader.result as string;
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = "";
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case "89504e47":
          this.imgIsValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          this.imgIsValid = true;
          break;
        default:
          this.imgIsValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if(this.imgIsValid){
        const reader = new FileReader();
        reader.onload = () => {
          this.imgUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
        this.signUpForm.patchValue({image: file});
      }
      };
    fileReader.readAsArrayBuffer(file);
    }
  }
}

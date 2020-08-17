import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { signupFields } from '../interfaces/signupFields';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup : signupFields = {
    username: "",
    password: "",
    password2: ""
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSignup(){
    if(this.signup.username && this.signup.password && this.signup.password2){
      if(this.signup.password == this.signup.password2){
        //ep here
        console.log(this.signup);
      this.router.navigateByUrl("/login");
      }else {
        alert("Password doesn't match");
      }
    }else {
      alert("Fill all the fields");
    }
  }

}

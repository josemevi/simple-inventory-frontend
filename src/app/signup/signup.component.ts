import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersRequestService } from '../users-request.service';
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

  constructor(private router: Router,private users: UsersRequestService) { }

  ngOnInit(): void {
  }

  doSignup(){
    if(this.signup.username && this.signup.password && this.signup.password2){
      if(this.signup.password == this.signup.password2){
        let data = {
          username: this.signup.username,
          password: this.signup.password
        }
        this.users.signup(data).subscribe(res => {
          console.log(res);
          alert(res.msg+" Please Sign In");
          this.router.navigateByUrl("/login");
        }, err => {
          console.error(err);
          alert(err.error.msg);
          if(err.status === 403){
            this.router.navigateByUrl("/dashboard");
          }
        });
      }else {
        alert("Password doesn't match");
      }
    }else {
      alert("Fill all the fields");
    }
  }

}

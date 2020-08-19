import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService }  from '../session.service';
import { UsersRequestService } from '../users-request.service';
import { loginFields } from '../interfaces/loginFields';
import { sessionAttributes } from '../interfaces/sessionAttributes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  login : loginFields = {
    username : "",
    password : "",
  }

  session: sessionAttributes;

  constructor(private router: Router, private sessionInfo: SessionService, private users: UsersRequestService) { 

  }

  ngOnInit(): void {
    this.session = this.sessionInfo.getSession();
  }

  doLogin(){
    if(this.login.username && this.login.password){
      let data = {
        username: this.login.username,
        password: this.login.password
      }
      this.users.login(data).subscribe(res => {
        console.log(res);
        this.sessionInfo.setSession(res.user_id,true,this.login.username, res.jsessionId)
        console.log(this.sessionInfo.getSession());
        localStorage.setItem("sessionInfo",JSON.stringify(this.sessionInfo.getSession()));
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }, err => {
        console.error(err);
        alert(err.error.msg);
      });              
    }else {
      alert("Fill all the fields")
    }
  }
}

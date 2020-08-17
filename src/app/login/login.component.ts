import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { loginFields } from '../interfaces/loginFields';
import { SessionService }  from '../session.service';
import { sessionAttributes } from '../interfaces/sessionAttributes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  login : loginFields = {
    username : "",
    password : ""
  }

  session: sessionAttributes;

  constructor(private router: Router, public sessionInfo: SessionService) { 

  }

  ngOnInit(): void {
    this.session = this.sessionInfo.getSession();
  }

  doLogin(){
    if(this.login.username && this.login.password){
      //ep here
      console.log(this.login);
      this.router.navigateByUrl("/dashboard");
      this.sessionInfo.setSession(true,this.login.username)
    }else {
      alert("Fill all the fields")
    }
  }

  //[(ngModel)]="login.user_name" [ngModelOptions]="{standalone: true}"
}

import { Component, OnInit } from '@angular/core';
import { loginFields } from '../interfaces/loginFields';

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

  constructor() { }

  ngOnInit(): void {
  }

  doLogin(){
    if(this.login.username && this.login.password){
      //ep here
      console.log("doLogin")
    }else {
      alert("Fill all the fields")
    }
  }

  //[(ngModel)]="login.user_name" [ngModelOptions]="{standalone: true}"
}

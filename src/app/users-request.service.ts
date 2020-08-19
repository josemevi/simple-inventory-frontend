import { Injectable } from '@angular/core';

import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class UsersRequestService {

  constructor(private http: DataService) { }

  login(requestBody){
    return this.http.doPost("login",requestBody)
  }

  logout(){
    return this.http.doGet("logout");
  }

  signup(requestBody){
    return this.http.doPost("signup",requestBody)
  }
}

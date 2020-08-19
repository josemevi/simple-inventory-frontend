import { Injectable } from '@angular/core';

import { sessionAttributes } from './interfaces/sessionAttributes';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session: sessionAttributes = {
      id: null,
      login : false,
      username : "",
      session :  null
  };
  private local = localStorage.getItem("sessionInfo")
  constructor() { 
    if (this.local != null){
      this.session = {
        id : JSON.parse(localStorage.getItem("sessionInfo")).id,
        login : JSON.parse(localStorage.getItem("sessionInfo")).login,
        username : JSON.parse(localStorage.getItem("sessionInfo")).username,
        session :  JSON.parse(localStorage.getItem("sessionInfo")).session
      }
    }
  }

  getSession() {
    return this.session;
  }

  setSession(id: Number, login: boolean, username: String, sessionId: String) {
    this.session.id = id;
    this.session.login = login;
    this.session.username = username;
    this.session.session = sessionId
  }
}


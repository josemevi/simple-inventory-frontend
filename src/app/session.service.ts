import { Injectable } from '@angular/core';

import { sessionAttributes } from './interfaces/sessionAttributes';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  session: sessionAttributes = {
    login : false,
    username : ""
  }
  
  getSession() {
    return this.session;
  }

  setSession(login: boolean, username: String) {
    this.session.login = login;
    this.session.username = username;
  }
}


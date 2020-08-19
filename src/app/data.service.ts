import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionService }  from './session.service';
import { sessionAttributes } from './interfaces/sessionAttributes';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private sessionInfo: SessionService) { }

  private session: sessionAttributes;
  private url = "http://localhost:8080/Inventory/";

  doPost(endPoint: String, data: any): Observable<any>{
    this.session = this.sessionInfo.getSession();
    return this.http.post(this.url+endPoint+"?JSESSIONID="+this.session.session,data)
  }

  doGet(endPoint: String, paramName?: any, paramValue?: any): Observable<any>{
    this.session = this.sessionInfo.getSession();
    if(!paramName && !paramValue){
      return this.http.get(this.url+endPoint+"?JSESSIONID="+this.session.session);
    }else {
      return this.http.get(this.url+endPoint+"?JSESSIONID="+this.session.session+"&"+paramName+"="+paramValue);
    }    
  }

  doPut(endPoint: String, data: any): Observable<any>{
    this.session = this.sessionInfo.getSession();
    return this.http.put(this.url+endPoint+"?JSESSIONID="+this.session.session,data)
  }

}

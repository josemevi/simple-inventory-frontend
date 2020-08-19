import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SessionService }  from '../session.service';
import { UsersRequestService } from '../users-request.service';
import { sessionAttributes } from '../interfaces/sessionAttributes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

    constructor(private router: Router, private sessionInfo: SessionService, private http: UsersRequestService) {}

    currentRoute: String = "";
    session: sessionAttributes 
    

    ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(res => {
            this.currentRoute = res["url"];
            this.session = this.sessionInfo.getSession();

        });
        this.session = this.sessionInfo.getSession();
    }

    logout() {
        if(confirm("Logged as "+this.session.username+"\nAre you sure you want to log out?")){
           this.http.logout().subscribe(res => {
            console.log(res);
            this.sessionInfo.setSession(null,false,"",null);
            localStorage.clear();
            this.router.navigate(['/login'], { replaceUrl: true });
           }, err => {
               console.error(err)
               alert(err.error.msg);
           })
                
            
        }
    }

}

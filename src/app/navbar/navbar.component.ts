import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SessionService }  from '../session.service';
import { sessionAttributes } from '../interfaces/sessionAttributes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

    constructor(private router: Router, public sessionInfo: SessionService) {}

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
            console.log("logout")
            this.sessionInfo.setSession(false,"");
            this.router.navigateByUrl("/login");
            //logout imp
        }
    }

}

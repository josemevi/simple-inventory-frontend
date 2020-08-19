import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemRequestService } from '../item-request.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,private items: ItemRequestService) { }

  itemData: any = [];

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.items.getItems().subscribe(res => {
      this.itemData = res.itemsData;
    }, err => {
      console.error(err);
      alert(err.error.msg);
      if(err.status === 403){
        this.router.navigateByUrl("/login");
      }
    });
  }

}

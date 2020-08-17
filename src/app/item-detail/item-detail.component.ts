import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) { }

  id = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
  }

  deactivate() {
    if(confirm("Are you sure?")){
      console.log("item deactivation")
      //item deactivation
    }
  }

}

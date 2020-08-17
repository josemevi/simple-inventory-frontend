import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  id = this.route.snapshot.paramMap.get('id');
  deactivated: boolean = false;
  ngOnInit(): void {
  }

  deactivate() {
    if(confirm("Are you sure?")){
      console.log("item deactivation")
      alert("Item Deactivated");
      this.router.navigateByUrl("/dashboard");
      //item deactivation
    }
  }

}

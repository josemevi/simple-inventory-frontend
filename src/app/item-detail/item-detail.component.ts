import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ItemRequestService } from '../item-request.service';
import { SessionService }  from '../session.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private router: Router,
     private items: ItemRequestService,
     private sessionInfo: SessionService) { }

  id = this.route.snapshot.paramMap.get('id');
  deactivated: boolean = false;
  itemData: any = [];
  priceRedux: any = [];
  deactivationInfo: any [];
  ngOnInit(): void {
    this.getItemInfo();
  }

  getItemInfo(){
    this.items.getItemInfo(+this.id).subscribe(res => {
     this.itemData = res.itemsData[0];
      if(this.itemData.state_id == 1){
        this.getItemDeactivationInfo();        
      }
      this.getItemPriceReduxInfo();
     
    }, err =>{
      console.error(err);
      alert(err.error.msg);
      if(err.status === 403){
        this.router.navigateByUrl("/login");
      }
    })
  }

  getItemPriceReduxInfo(){
    this.items.getItemPriceReduxInfo(+this.id).subscribe(res => {
      console.log(res);
      if(!res.msg){
        this.priceRedux = res.itemPriceReduxData;
      }
    }, err =>{
      console.error(err);
      alert(err.error.msg);
      if(err.status === 403){
        this.router.navigateByUrl("/login");
      }
    })
  }

  getItemDeactivationInfo(){
    this.items.getItemDeactivationInfo(+this.id).subscribe(res => {    
      this.deactivationInfo = res.itemDeactivationData[0]; 
      this.deactivated = true; 
    }, err =>{
      console.error(err);
      alert(err.error.msg);
      if(err.status === 403){
        this.router.navigateByUrl("/login");
      }
    })
  }

  deactivate() {
    let reason = prompt("Reason:");
    console.log(reason);
    if(reason){
      if(confirm("Are you sure?")){
        let data = {
          user_id: +this.sessionInfo.getSession().id,
          item_id : this.id,
          state_id: "1",
          deactivation_reason: reason
        }
        this.items.editItemState(data).subscribe(res => {
          alert("Item Deactivated");
          this.router.navigateByUrl("/dashboard");
        },err => {
          console.error(err);
          alert(err.error.msg);
          if(err.status === 403){
            this.router.navigateByUrl("/login");
          }
        })                        
      }
    
    }else {
      alert("Must provide a reason");
    }
  }

}

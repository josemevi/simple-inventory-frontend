import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemRequestService } from '../item-request.service';
import { SessionService }  from '../session.service';
import { itemBasicFields } from '../interfaces/itemBasicFields';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  constructor(private router: Router,
    private items: ItemRequestService,
    private sessionInfo: SessionService) { }

  itemBasic : itemBasicFields = {
    code: "",
    id : null,
    description : "",
    price: null,
    supplier_id: -1,
    image_url: ""
  }

  supplierData : any = [];

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(){
    this.items.getSuppliers().subscribe(res => {
      this.supplierData = res.suppliersData;
    }, err =>{
      console.error(err);
      alert(err.error.msg);
      if(err.status === 403){
        this.router.navigateByUrl("/login");
      }
    });
  }

  addItem(){
    console.log(this.itemBasic);
    if(this.itemBasic.code.toString() && this.itemBasic.description){
      let data = {
        user_id: +this.sessionInfo.getSession().id,
        item_code: this.itemBasic.code,
        item_description: this.itemBasic.description,
        item_price: this.itemBasic.price ? this.itemBasic.price : -1,
        supplier_id: this.itemBasic.supplier_id,
        item_img_url: this.itemBasic.image_url ? this.itemBasic.image_url:'../../assets/img/default-item.jpg'
      }
      this.items.addItem(data).subscribe(res =>{
        if(confirm("Item Created.\nDo you wish to return to the Dashboard?")){
          this.router.navigateByUrl("/dashboard");
        }
      }, err => {
        console.error(err);
        alert(err.error.msg);
        if(err.status === 403){
          this.router.navigateByUrl("/login");
        }
      });      
    }else {
      alert("Important fields are empty");
    }
  }

}

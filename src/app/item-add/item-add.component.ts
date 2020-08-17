import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { itemBasicFields } from '../interfaces/itemBasicFields';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  constructor(private router: Router) { }

  itemBasic : itemBasicFields = {
    code: "",
    id : null,
    description : "",
    price: null,
    supplier_id: null,
    image_url: ""
  }

  ngOnInit(): void {
  }

  addItem(){
    if(this.itemBasic.code && this.itemBasic.description){
      if(!this.itemBasic.image_url){
        this.itemBasic.image_url = '../../assets/img/default-item.jpg';
      }
      console.log(this.itemBasic);
      if(confirm("Item Created.\nDo you wish to return to the Dashboard?")){
        this.router.navigateByUrl("/dashboard");
      }
    }else {
      alert("Important fields are empty");
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { itemBasicFields } from '../interfaces/itemBasicFields';
import { itemReduxFields } from '../interfaces/itemReduxFields';
import { itemReduxAddFields } from '../interfaces/itemReduxAddFields';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  id = +this.route.snapshot.paramMap.get('id');

  itemBasic : itemBasicFields = {
    code: "",
    id : this.id,
    description : "",
    price: null,
    supplier_id: null,
    image_url: ""
  }

  itemRedux : itemReduxFields = {
    item_id: this.id,
    reduction_id: null,
    remove: false
  }

  redux : itemReduxAddFields = {
    price: null,
    start_date: "",
    end_date: ""
  }

  ngOnInit(): void {
  }

  changeBasicInfo(){
    if(this.itemBasic.description){
      if(!this.itemBasic.image_url){
        this.itemBasic.image_url = '../../assets/img/default-item.jpg';
      }
      console.log(this.itemBasic);
      //ep here
      if(confirm("Item Information Edited.\nDo you wish to return to item details?")){
        this.router.navigateByUrl("/itemDetail/"+this.id);
      }              
    }else {
      alert("Description is empty");
    }
  }

  changeReduxInfo(){
    if(this.itemRedux.reduction_id){
      console.log(this.itemRedux);
      //do edit
      
      if(confirm("Item Price Reduction Edited.\nDo you wish to return to item details?")){
        this.router.navigateByUrl("/itemDetail/"+this.id);
      } 
      
    }else {
      this.itemRedux.remove = true;
      console.log(this.itemRedux);
      //remove 
      if(confirm("Item Information Removed.\nDo you wish to return to item details?")){
        this.router.navigateByUrl("/itemDetail/"+this.id);
      } 
    }
  }

  addRedux(){
    if(this.redux.price && this.redux.start_date && this.redux.end_date){
      //add here
      console.log(this.redux);
    }else {
      alert("Fill all the fields");
    }
  }
}

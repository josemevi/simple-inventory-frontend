import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ItemRequestService } from '../item-request.service';
import { SessionService }  from '../session.service';
import { itemBasicFields } from '../interfaces/itemBasicFields';
import { itemReduxFields } from '../interfaces/itemReduxFields';
import { itemReduxAddFields } from '../interfaces/itemReduxAddFields';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private items: ItemRequestService,
    private sessionInfo: SessionService) { }

  id = +this.route.snapshot.paramMap.get('id');

  itemBasic : itemBasicFields = {
    code: "",
    id : this.id,
    description : "",
    price: null,
    supplier_id: -1,
    image_url: ""
  }

  itemRedux : itemReduxFields = {
    item_id: this.id,
    reduction_id: -1,
    remove: false
  }

  redux : itemReduxAddFields = {
    price: null,
    start_date: "",
    end_date: ""
  }

  supplierData: any = [];
  reduxData: any = [];

  ngOnInit(): void {
    this.getSuppliers();
    this.getPricesReductions();
  }

  getSuppliers(){
    this.items.getSuppliers().subscribe(res => {
      this.supplierData = res.suppliersData;
      this.getItemInfo();
    }, err =>{
      console.error(err);
      alert(err.error.msg);
      if(err.status === 403){
        this.router.navigateByUrl("/login");
      }
    });
  }

  getItemInfo(){
    this.items.getItemInfo(+this.id).subscribe(res => {
      console.log(res);
     let data = res.itemsData[0];
      this.itemBasic.description = data.item_description;
      this.itemBasic.price = data.item_price;
      this.itemBasic.supplier_id = data.supplier_id == "null" ? -1 : data.supplier_id; 
      this.itemBasic.image_url = data.item_img_url;
      this.itemRedux.reduction_id = data.reduction_id == "null" ? -1: data.reduction_id
    }, err =>{
      console.error(err);
      alert(err.error.msg);
      if(err.status === 403){
        this.router.navigateByUrl("/login");
      }
    })
  }

  changeBasicInfo(){
    if(this.itemBasic.description){
      let data = {
        item_id : this.id,
        user_id: +this.sessionInfo.getSession().id,
        item_code: this.itemBasic.code,
        item_description: this.itemBasic.description,
        item_price: this.itemBasic.price ? this.itemBasic.price : -1,
        supplier_id: this.itemBasic.supplier_id,
        item_img_url: this.itemBasic.image_url ? this.itemBasic.image_url:'../../assets/img/default-item.jpg'
      }
      this.items.editItem(data).subscribe(res =>{
        if(confirm("Item Information Edited.\nDo you wish to return to item details?")){
          this.router.navigateByUrl("/itemDetail/"+this.id);
        }  
      }, err => {
        console.error(err);
        alert(err.error.msg);
        if(err.status === 403){
          this.router.navigateByUrl("/login");
        }
      });                  
    }else {
      alert("Description is empty");
    }
  }

  addRedux(){
    if(this.redux.price && this.redux.start_date && this.redux.end_date){
      let data = {
        reduction_price: this.redux.price,
        reduction_start_date: this.redux.start_date,
        reduction_end_date: this.redux.end_date
      }
      if(this.checkDates(this.convertDate(data.reduction_start_date.toString()), this.convertDate(data.reduction_end_date.toString()), true)){
        this.items.addPriceRedux(data).subscribe(res => {
          console.log(res);
          alert(res.msg);
          this.getPricesReductions();
          document.getElementById("close").click();
        }, err =>{
          console.error(err);
          alert(err.error.msg);
          if(err.status === 403){
            this.router.navigateByUrl("/login");
          }
        })      
      }     
    }else {
      alert("Fill all the fields");
    }
  }

  getPricesReductions(){
    this.items.getPriceReductions().subscribe(res => {
      console.log(res);
      let cleanRes = []
      for(let i = 0;i < res.reduxData.length; i++){
        if(!this.checkDates(new Date(res.reduxData[i].reduction_end_date),null,false)){
          cleanRes.push(res.reduxData[i]);
        }
      }      
      this.reduxData = cleanRes;
    }, err =>{
      console.error(err);
      alert(err.error.msg);
      if(err.status === 403){
        this.router.navigateByUrl("/login");
      }
    });
  }

  reduxInfoWrapper(requestBody: any, option: String){
    this.items.editItemPriceRedux(requestBody).subscribe(res => {
      console.log(res);
      if(confirm("Item Price Reduction "+option+".\nDo you wish to return to item details?")){
        this.router.navigateByUrl("/itemDetail/"+this.id);
      } 
    }, err =>{
      console.error(err);
      alert(err.error.msg);
      if(err.status === 403){
        this.router.navigateByUrl("/login");
      }
    });
  }

  changeReduxInfo(){
    let data = {
      item_id: this.id,
      reduction_id: this.itemRedux.reduction_id,
      remove : this.itemRedux.remove
    }
    if(this.itemRedux.reduction_id > 0){
      this.reduxInfoWrapper(data, "Edited");
    }else {
      data.remove = true;
      this.reduxInfoWrapper(data, "Removed");
    }
  }

  checkDates(a?: Date, b?: Date, toInsert?:boolean): boolean{
    let current = new Date(new Date().toISOString())
    if(toInsert){
      if(a < current){
        alert("Offer can't start in the past");
        return false
      }
      if(b < a){
        alert("Offer can't end before the start date");
        return false
      }
      if(a.toString() == b.toString()){
        alert("Offer dates can't be the same");
        return false
      }
      if(a < b){
        return true
      }
    }else {
        if(current > a){                  
          return true
        }else {                  
          return false;
        }
    }  
  }

  convertDate(d){
    var parts = d.split('-');
    return new Date(parts[0], parts[1], parts[2]);
  }
 
}

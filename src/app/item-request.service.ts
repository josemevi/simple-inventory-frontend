import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ItemRequestService {

  constructor(private http: DataService) { }

  ///////////////////////// POST /////////////////////////

  addItem(requestBody: any){
    return this.http.doPost("addItem",requestBody);
  }

  addPriceRedux(requestBody: any){
    return this.http.doPost("addPriceRedux",requestBody);
  }

  ///////////////////////// POST /////////////////////////


  ///////////////////////// GET /////////////////////////

  getItems(){
    return this.http.doGet("getItems");
  }

  getItemInfo(item_id: Number){
    return this.http.doGet("getItemInfo","item_id",item_id);
  }

  getItemPriceReduxInfo(item_id: Number){
    return this.http.doGet("getItemPriceReduxInfo","item_id",item_id);
  }

  getItemDeactivationInfo(item_id: Number){
    return this.http.doGet("getItemDeactivationInfo","item_id",item_id);
  }

  getSuppliers(){
    return this.http.doGet("getSuppliers");
  }

  getPriceReductions(){
    return this.http.doGet("getPricesReductions");
  }

  ///////////////////////// GET /////////////////////////


  ///////////////////////// PUT /////////////////////////

  editItemState(requestBody: any){
    return this.http.doPut("editItemState",requestBody);
  }

  editItem(requestBody: any){
    return this.http.doPut("editItem",requestBody);
  }

  editItemPriceRedux(requestBody: any){
    return this.http.doPut("editItemPriceRedux", requestBody);
  }

  ///////////////////////// PUT /////////////////////////

}

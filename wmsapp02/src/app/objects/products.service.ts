//////////////////////////////////////
// products.service.ts
// @ Author Brian
////////////////////////////////////////
/*
Products:
 The users can manage the products.
 User can view, add, edit or delete a product.
 When a user adds a product, they should select a category for the product.
 The product must be paged with a page size of 10.
 The user should be able to view, add, edit an image against each product.
*/


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Products } from './products.model';

// let appport = 9080;
//let url = "http://127.0.0.1:"+appport;
let httpsport = 9090;
let surl = "https://127.0.0.1:"+httpsport;
/*/
let appport2 = 8080;
let httpsport2 = 8090;
let url2 = "http://127.0.0.1:"+appport2;
let surl2 = "https://127.0.0.1:"+httpsport2;
/*/


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //appport = 9080;
  //url = "http://127.0.0.1:"+appport;
  //httpsport = 9090;
  //surl = "https://127.0.0.1:"+httpsport;
  prodApi: string =  surl+"/api/products";
  listprodApi: string = surl+"/api/productslist";
  updateprodApi: string = surl+"/api/updateproducts/update";
  deleteprodApi: string = surl+"/api/delteproducts/delete";
  /*/
  appport2 = 8080;
  httpsport2 = 8090;
  url2 = "http://127.0.0.1:"+appport2;
  surl2 = "https://127.0.0.1:"+httpsport2;
  prodApi: string =  surl2+"/api/products";
  listprodApi: string = surl2+"/api/products/list";
  updateprodApi: string = surl2+"/api/products/update";
  deleteprodApi: string = surl2+"/api/products/delete";
  /*/
  doneApi = false;
  headerOp;
  login = false;
  refn;
  products;
  token;
  protocol01;
  url01;

  constructor(private httpClient: HttpClient,
    private router: Router) {
    this.headerOp = new HttpHeaders();
    this.headerOp.append('Content-Type', 'application/json');
    this.products = new Products();
    this.protocol01 = (<HTMLInputElement>document.getElementById("urlProtocol2")).value;
    this.url01 = (<HTMLInputElement>document.getElementById("url2b")).value;
    this.prodApi = this.protocol01+"://"+this.url01+"/api/products";
    this.listprodApi = this.protocol01+"://"+this.url01+"/api/productslist";
    this.updateprodApi = this.protocol01+"://"+this.url01+"/api/updateproducts/update";
    this.deleteprodApi = this.protocol01+"://"+this.url01+"/api/delteproducts/delete";
  }

  registerProducts(data){
    //CRUD: C for Create Products.
    alert("registerProducts: "+data);
    return this.httpClient.post(this.prodApi+"?data="+data, this.headerOp);
  }

  listProducts(data){
    //CRUD: R for Read Products.
    console.log("listProducts")
    return this.httpClient.get(this.listprodApi, data);
  }

  updateProducts(data){
    //CRUD: U for Update Products.
    alert("updateProducts: "+data);
    return this.httpClient.post(this.updateprodApi+"?data="+data, this.headerOp);
  }

  deleteProducts(data){
    //CRUD: D for Delete Products.
    alert("deleteProducts: "+data);
    return this.httpClient.post(this.deleteprodApi+"?data="+data, this.headerOp);
  }

}



//
/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
}
*/

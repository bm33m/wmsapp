//////////////////////////////////////
// categories.service.ts
// @ Author Brian
////////////////////////////////////////
/*
Categories:
 The users can manage the categories.
 User can view, add, edit a category.
 The user must enter a unique category code for each Category, containing 3 alphabet letters and three
numeric characters e.g., ABC123.
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Categories } from './categories.model';

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
export class CategoriesService {
  //appport = 9080;
  //url = "http://127.0.0.1:"+appport;
  //httpsport = 9090;
  //surl = "https://127.0.0.1:"+httpsport;
  categApi: string = surl+"/api/categories";
  listcategApi: string = surl+"/api/listcategories";
  updatecategApi: string = surl+"/api/updatecategories/update";
  listcategApiByID: string = surl+"/api/categories/category";
  /*/
  appport2 = 8080;
  httpsport2 = 8090;
  url2 = "http://127.0.0.1:"+appport2;
  surl2 = "https://127.0.0.1:"+httpsport2;
  categApi: string = surl2+"/api/categories";
  listcategApi: string = surl2+"/api/listcategories";
  updatecategApi: string = surl2+"/api/updatecategories/update";
  /*/
  doneApi = false;
  headerOp;
  login = false;
  refn;
  categories;
  token;
  protocol01;
  url01;

  constructor(private httpClient: HttpClient,
    private router: Router) {
    this.headerOp = new HttpHeaders();
    this.headerOp.append('Content-Type', 'application/json');
    this.categories = new Categories();
    this.protocol01 = (<HTMLInputElement>document.getElementById("urlProtocol2")).value;
    this.url01 = (<HTMLInputElement>document.getElementById("url2b")).value;
    this.categApi = this.protocol01+"://"+this.url01+"/api/categories";
    this.listcategApi = this.protocol01+"://"+this.url01+"/api/listcategories";
    this.updatecategApi = this.protocol01+"://"+this.url01+"/api/updatecategories/update";
    this.listcategApiByID = this.protocol01+"://"+this.url01+"/api/categories/category";
  }

  registerCategories(data){
    //CRUD: C for Create Categories.
    alert("registerCategories: "+data);
    return this.httpClient.post(this.categApi+"?data="+data, this.headerOp);
  }

  updateCategories(data){
    //CRUD: U for Update Categories.
    alert("updateCategories: "+data);
    return this.httpClient.post(this.updatecategApi+"?data="+data, this.headerOp);
  }

  listCategories(data){
    //CRUD: R for Read Categories.
    return this.httpClient.get(this.listcategApi, data);
  }

}

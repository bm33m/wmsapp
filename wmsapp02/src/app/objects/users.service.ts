//////////////////////////////////////
// users.service.ts
// @ Author Brian
////////////////////////////////////////
/*
Login:
 The user can register on the web application using an email and password.
 An email notification will be required to send an email to the email address of the user.
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Users } from './users.model';

//http://127.0.0.1:9080/
//https://127.0.0.1:9090/
//let appport = 9080;
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
export class UsersService {
  regApi: string = surl+"/api/register";
  logApi: string = surl+"/api/login";
  logoutApi: string = surl+"/api/logout";
  emailApi: string = surl+"/api/email";
  /*/
  regApi: string = surl2+"/api/register";
  logApi: string = surl2+"/api/login";
  emailApi: string = surl2+"/api/email";
  /*/
  doneApi = false;
  headerOp;
  login = false;
  refn;
  user;
  name;
  email;
  userid;
  token;
  protocol01;
  url01;
  //lblonline;
  //lbltoken;
  //lblname;
  //lblemail;

  constructor(private httpClient: HttpClient,
    private router: Router) {
    this.headerOp = new HttpHeaders();
    this.headerOp.append('Content-Type', 'application/json');
    this.user = new Users();
    this.protocol01 = (<HTMLInputElement>document.getElementById("urlProtocol2")).value;
    this.url01 = (<HTMLInputElement>document.getElementById("url2b")).value;
    this.regApi = this.protocol01+"://"+this.url01+"/api/register";
    this.logApi = this.protocol01+"://"+this.url01+"/api/login";
    this.logoutApi = this.protocol01+"://"+this.url01+"/api/logout";
    this.emailApi = this.protocol01+"://"+this.url01+"/api/email";
    //this.lbltoken = (<HTMLInputElement>document.getElementById("lbltoken"));
    //this.lblonline = (<HTMLInputElement>document.getElementById("lblonline"));
    //this.lblname = (<HTMLInputElement>document.getElementById("lblname"));
    //this.lblemail = (<HTMLInputElement>document.getElementById("lblemail"));
  }

  registerUsers(data){
    //CRUD: C for Create Users.
    alert("users: "+data);
    return this.httpClient.post(this.regApi+"?data="+data, this.headerOp);
  }

  loginUsers(data){
    alert("login: "+data);
    //this.lbltoken.innerHTML = "true";
    //this.lblonline.innerHTML = "true";
    //this.lblname.innerHTML = "true";
    //this.lblemail.innerHTML = "true";
    return this.httpClient.post(this.logApi+"?data="+data, this.headerOp);
  }

  logoutUsers(data){
    alert("logout: "+data);
    //this.lbltoken.innerHTML = "";
    //this.lblonline.innerHTML = "false";
    //this.lblname.innerHTML = "";
    //this.lblemail.innerHTML = "";
    return this.httpClient.post(this.logoutApi+"?data="+data, this.headerOp);
  }

  emailUsers(data){
    alert("email: "+data);
    return this.httpClient.post(this.emailApi+"?data="+data, this.headerOp);
  }
}

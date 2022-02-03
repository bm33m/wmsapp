//////////////////////////////////////
// online.service.ts
// @ Author Brian
////////////////////////////////////////
/*
Online:
Login users can work online.
Logout users can login.
*/

import { Injectable } from '@angular/core';
import { UsersService } from '../objects/users.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  name;
  email;
  token;
  login;
  navOnline;
  navOffline;
  lblInfo;
  systemInfo;
  lblonline;
  lbltoken;
  lblname;
  lblemail;

  constructor(private dataService02: UsersService) {
    this.email = this.dataService02.email;
    this.name = this.dataService02.name;
    this.token = (this.dataService02.token == null) ? "#00321" : this.dataService02.token;
    this.login = this.dataService02.login;
    this.navOffline = document.getElementById("navbar01div");
    this.navOnline = document.getElementById("navbar02div");
    this.lblInfo  = document.getElementById("lblsystemInfo");
    this.lbltoken = (<HTMLInputElement>document.getElementById("lbltoken"));
    this.lblonline = (<HTMLInputElement>document.getElementById("lblonline"));
    this.lblname = (<HTMLInputElement>document.getElementById("lblname"));
    this.lblemail = (<HTMLInputElement>document.getElementById("lblemail"));
    this.systemInfo = this.navbarOnline();
    console.log("#03 systemInfo: "+this.systemInfo);
  }

  userLogin(name, email, token) {
    this.dataService02.login = true;
    this.lbltoken.innerHTML = token;
    this.lblonline.innerHTML = "true";
    this.lblname.innerHTML = name;
    this.lblemail.innerHTML = email;
    this.navbarOnline();
    //this.dataService02.loginUsers({email, token});
  }

  userLogout() {
    let online2 = this.lblonline.innerHTML;
    let token2 = this.lbltoken.innerHTML;
    let name2 = this.lblname.innerHTML;
    let email2 = this.lblemail.innerHTML;
    this.dataService02.login = false;
    this.lbltoken.innerHTML = "";
    this.lblonline.innerHTML = "false";
    this.lblname.innerHTML = "";
    this.lblemail.innerHTML = "";
    if (online2 == "true"){
      this.dataService02.logoutUsers({email2, token2});
    }
  }

  navbarOnlineX = () => {
    console.log("navbarOnline....."+this.dbDateTime());
  };

  navbarOnline = () => {
    try {
      let online2 = this.lblonline.innerHTML;
      let token2 = this.lbltoken.innerHTML;
      let name2 = this.lblname.innerHTML;
      let email2 = this.lblemail.innerHTML;
      alert("token2: "+token2);
      let tokenLength = token2.length;
      console.log("#tokenLength: "+tokenLength+"\n#token2: "+token2);
      if ((online2 == "true") && (tokenLength > 9)) {
        this.navOffline.style.display = "none";
        this.navOnline.style.display = "block";
        this.systemInfo = "onLine: "+this.dbDateTime();
        this.lblInfo.innerHTML = this.systemInfo;
        this.lblInfo.style.color = this.randColor();
        this.lblInfo.style.backgroundColor = this.randColor();
        return this.systemInfo;
      } else {
        this.navOffline.style.display = "block";
        this.navOnline.style.display = "none";
        this.systemInfo = "offLine: "+this.dbDateTime();
        this.lblInfo.innerHTML = this.systemInfo;
        this.lblInfo.style.color = this.randColor();
        return this.systemInfo;
      }
    } catch(e) {
      console.log("OnlineService navOnline: "+e);
    }
    return "systemError: "+this.dbDateTime();
  };

  randColor() {
    let rColors = ["red", "green", "blue", "yellow"];
    let x = Math.random();
    let y = Math.floor(x * 300);
    let z = rColors.length;
    x = y % z;
    return rColors[x];
  }

  dbDateTime () {
    let now = new Date();
    return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
  }
}

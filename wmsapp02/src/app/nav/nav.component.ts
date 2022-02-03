import { Component, OnInit } from '@angular/core';
import { Users } from '../objects/users.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../app.component.css']
})
export class NavComponent implements OnInit {
  appTitle;
  online;
  appurl;
  urlList;
  protocol;
  txtUrl;
  urlProtocol;
  protocolb;
  urlb;
  appDate;
  animate;
  navOnline;
  navOffline;
  lblInfo;
  systemInfo;

  constructor() {
    this.appTitle = "Wmsapp";
    this.appDate = this.dbDateTime();
    console.log(this.appTitle+"\n#01 NavComponent: "+this.appDate);
  }

  ngOnInit() {
    //http://127.0.0.1:9080/
    //https://127.0.0.1:9090/
    this.appurl = document.URL;
    console.log(this.appurl);
    this.txtUrl = document.getElementById("urltxt2");
    this.txtUrl.value = this.appurl;
    this.urlList = this.appurl.split("://");
    this.protocol = this.urlList[0];
    this.urlProtocol = document.getElementById("urlProtocol2");
    this.urlProtocol.value = this.protocol;
    this.protocolb = this.urlList[1].split("/");
    this.urlb = document.getElementById("url2b");
    this.urlb.value = this.protocolb[0];
    console.log("#02 ngOnInit NavComponent...."+this.dbDateTime());
    this.navOffline = document.getElementById("navbar01div");
    this.navOnline = document.getElementById("navbar02div");
    this.lblInfo  = document.getElementById("lblsystemInfo");
    this.systemInfo = this.navbarDisplay(this.appTitle);
    console.log(this.dbDateTime()+"\n#03 systemInfo: "+this.systemInfo);
  }

  navbarDisplayX = (info) => {
    console.log(info+"#\n#navbarDisplay....."+this.dbDateTime());
  };

  navbarDisplay (info) {
    try {
      this.navOffline.style.display = "display";
      this.navOnline.style.display = "none";
      this.lblInfo.innerHTML = info+", "+this.dbDateTime();
      this.lblInfo.style.color = this.randColor();
      this.lblInfo.style.backgroundColor = this.randColor();
    } catch(e){
      console.log("NavComponent navbarOnline: "+e)
    }
    return info+", "+this.dbDateTime();
  }

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

  appTime(info, data) {
    this.appDate = this.dbDateTime();
    data.innerHTML = this.appDate;
    data.style.color = this.randColor();
    info.style.backgroundColor = this.randColor();
    //console.log("# "+data+"\n"+this.appDate);
  }
}

let userNavBar = {
  userid: 0,
  name: "",
  surname: "",
  email: "",
  password: "",
  isactive: "",
  created: "",
  modified: "",
  token: ""
};

let appUser = new Users();
let app = new NavComponent();
let animate;
let imageApp = null;
let imagePosition;
let appInfo = null;
let appDateTime = null;
let wsize;

let init = () => {
  imageApp = document.getElementById('appImage1');
  imageApp.style.position= 'relative';
  imageApp.style.left = '0px';
  appDateTime = document.getElementById("lblonline1");
  appInfo  = document.getElementById("lblsystemInfo");
  wsize = window.innerWidth;
};

let moveImage = () => {
  imagePosition = parseInt(imageApp.style.left) + 5;
  imageApp.style.left = imagePosition + 'px';
  if (imagePosition > wsize){
    app.appTime(appInfo, appDateTime);
    imageApp.style.left = '0px';
    wsize = window.innerWidth;
    wsize += 100;
  }
  animate = setTimeout(moveImage, 10);
};

window.onload = () => {
  init();
  moveImage();
};

//////////////////////////////////////
// login.component.ts
// @ Author Brian
////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../objects/users.service';
import { OnlineService } from '../objects/online.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent implements OnInit {
  //
  //Login users.
  //
  lgForm: FormGroup;
  logInfo;
  randInfo;
  name;
  email;
  token;
  login;
  systemInfo;
  lblonline;

  constructor(private formBuilder: FormBuilder,
    private dataService: UsersService,
    private dataService03: OnlineService,
    private router: Router) {
      this.randInfo = this.randColor();
      this.logInfo = "Login: "+this.randInfo;
      this.email = this.dataService.email;
      this.name = this.dataService.name;
      this.token = this.dataService.token;
      this.login = this.dataService.login;
      this.systemInfo = this.dataService03.navbarOnline();
      this.dataService03.userLogout();
      console.log("#03 systemInfo: "+this.systemInfo);
  }

  ngOnInit() {
    this.lgForm = this.formBuilder.group({
      emailN: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      passwordN: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]]
    });
  }

  get fld(){ return this.lgForm.controls; }

  loginUser(){
    let rfDate = new Date();
    let ref = rfDate.getTime();
    if(this.lgForm.invalid){
      this.logInfo += "#\nData error..."+ref+"\n#"+this.randColor();
      return;
    }
    //alert(this.logInfo);
    try {
      let log = {
        "email": this.fld.emailN.value,
        "password": this.fld.passwordN.value,
      };
      let datad = JSON.stringify(log);
      console.log(datad);
      let info = this.dataService.loginUsers(datad);
      let dataR;
      console.log("info: "+info);
      info.subscribe(res => {
        console.log("res: "+res);
        dataR = res["Users"] as string [];
        console.log("Users: "+dataR);
        console.log("Login: "+res["Login"]);
        console.log("Users: "+res["Users"]);
        console.log("Time: "+res["Time"]);
        console.log("Token: "+res["Token"]);
        console.log("Error: "+res["Error"]);
        let dataERR = res["Error"] as string [];
        console.log("Error: "+dataERR);
        if (res["Login"] == 1) {
          let userList = [];
          let listX = res["Users"].length;
          console.log("listX: "+listX);
          let usersX = JSON.stringify(res["Users"]);
          console.log("usersX: "+usersX)
          let listX0 = res["Users"];
          console.log("listX0: "+listX0[0]["email"]);
          for (let i = 0; i < listX; i++){
            console.log(i+"#userid: "+res["Users"][i]["userid"]);
            console.log(i+"#name: "+res["Users"][0]["name"]);
            console.log(i+"#email: "+res["Users"][0]["email"]);
          }
          this.dataService.user = {
            "userid": res["Users"][0].userid,
            "name": res["Users"][0].name,
            "surname": res["Users"][0].surname,
            "email": res["Users"][0].email,
            "password": "******"+this.randInfo+"***",
            "isactive": res["Users"][0]["isactive"],
            "created": res["Users"][0]["created"],
            "modified": res["Users"][0]["modified"],
            "token": res["Token"]
          };
          this.dataService.login = true;
          this.dataService.refn = res["Token"];
          this.dataService.token = res["Token"];
          this.dataService.email = log["email"],
          this.dataService.name = log["name"],
          console.log(this.dataService.refn);
          console.log(this.dataService.user);
          console.log(this.dataService.user.name);
          this.dataService03.userLogin(this.dataService.user.name,
            this.dataService.user.email,
            this.dataService.user.token);
          //this.dataService.loginUsers("true");
          this.router.navigate(['/products']);
          //this.router.navigate(['/categories']);
        } else {
          this.logInfo = "System error:"+this.randColor();
        }
      });
      //
    } catch(e){
      console.log(e);
    }
  }

  randColor() {
    let rColors = ["colors.red", "colors.green", "colors.blue", "colors.yellow"];
    let x = Math.random();
    let y = Math.floor(x * 300);
    let z = rColors.length;
    x = y % z;
    return rColors[x];
  }
}

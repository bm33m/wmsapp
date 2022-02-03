//////////////////////////////////////
// register.component.ts
// @ Author Brian
////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
import { UsersService } from '../objects/users.service';
import { OnlineService } from '../objects/online.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../app.component.css']
})
export class RegisterComponent implements OnInit {
  //
  //Register users.
  //
  rgForm: FormGroup;
  regInfo;
  randInfo;
  name;
  email;
  token;
  login;
  systemInfo;

  constructor(private formBuilder: FormBuilder,
    private dataService: UsersService,
    private dataService03: OnlineService,
    private router: Router) {
      this.randInfo = this.randColor();
      this.regInfo = "Registration: "+this.randInfo+",... ";
      this.email = this.dataService.email;
      this.name = this.dataService.name;
      this.token = this.dataService.token;
      this.login = this.dataService.login;
      this.systemInfo = this.dataService03.navbarOnline();
      console.log("#03 systemInfo: "+this.systemInfo);
  }

  ngOnInit() {
    this.rgForm = this.formBuilder.group({
      surnameN: ['', ''],
      nameN: ['', Validators.required],
      emailN: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      passwordN: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      isactiveN: ['', Validators.required],
      msgN: ['', '']
    });
  }

  get fld(){ return this.rgForm.controls; }

  registerUser(){
    let rfDate = new Date();
    let ref = rfDate.getTime();
    if(this.rgForm.invalid){
      this.regInfo += "#\nData error..."+ref+"\n#"+this.randColor();
      return;
    }
    //alert(this.regInfo);
    try {
      let log = {
        "name": this.fld.nameN.value,
        "surname": this.fld.surnameN.value,
        "email": this.fld.emailN.value,
        "password": this.fld.passwordN.value,
        "isactive": this.fld.isactiveN.value,
      };
      let datad = JSON.stringify(log);
      console.log(datad);
      let info = this.dataService.registerUsers(datad);
      let dataR;
      info.subscribe(res => {
        console.log("res: "+res);
        dataR = res["Users"] as string [];
        console.log("Users: "+dataR);
        console.log("Register: "+res["Register"]);
        console.log("Users: "+res["Users"]);
        console.log("Time: "+res["Time"]);
        console.log("Token: "+res["Token"]);
        console.log("Error: "+res["Error"]);
        let dataERR = res["Error"] as string [];
        console.log("Error: "+dataERR);
        if (res["Register"] == 1) {
          this.dataService.user = {
            "userid": 0, //res["Users"]["userid"],
            "name": log["name"], //res["Users"]["name"],
            "surname": log["surname"], //res["Users"]["surname"],
            "email": log["email"], //res["Users"]["email"],
            "password": "******"+this.randInfo+"***",
            "isactive": log["email"], //res["Users"]["isactive"],
            "created": "............", //res["Users"]["created"],
            "modified": "............", //res["Users"]["modified"],
            "token": res["token"],
          };
          this.dataService.login = false;
          this.dataService.refn = res["Token"];
          this.dataService.token = res["Token"];
          this.dataService.email = log["email"],
          this.dataService.name = log["name"],
          this.router.navigate(['/login']);
        } else {
          this.regInfo = "System error:"+this.randColor();
        }
      });
      //this.dataService.name = "To wmsapp",
      //this.router.navigate(['/login']);
    } catch(e){
      console.log(e)
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

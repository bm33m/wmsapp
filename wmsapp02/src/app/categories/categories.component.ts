//////////////////////////////////////
// categories.component.ts
// @ Author Brian
////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
import { CategoriesService } from '../objects/categories.service';
import { UsersService } from '../objects/users.service';
import { OnlineService } from '../objects/online.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../app.component.css']
})
export class CategoriesComponent implements OnInit {
  //
  //Create categories instance.
  //
  categSearchForm: FormGroup;
  categForm: FormGroup;
  categInfo;
  randInfo;
  name;
  email;
  token;
  login;
  systemInfo;
  categories;
  header = [ "categoryid", "categorycode",
    "name", "isactive",
    "createdby", "modifiedby",
    "listdate", "modified",
  ];
  categoriesIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

  constructor(private formBuilder: FormBuilder,
    private dataService: CategoriesService,
    private dataService02: UsersService,
    private dataService03: OnlineService,
    private router: Router) {
      this.randInfo = this.randColor();
      this.categInfo = "Categories: "+this.randInfo+",... ";
      this.email = this.dataService02.email;
      this.name = this.dataService02.name;
      this.token = this.dataService02.token;
      this.login = this.dataService02.login;
      this.systemInfo = this.dataService03.navbarOnline();
      console.log("#03 systemInfo: "+this.systemInfo);
  }

  ngOnInit() {
    this.categForm = this.formBuilder.group({
      categorycodeN: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3}[0-9]{3}$")]],
      nameN: ['', Validators.required],
      isactiveN: ['', Validators.required],
      userN: ['', Validators.required],
      infoN: ['', '']
    });
    this.allCategories();
  }

  get fld(){ return this.categForm.controls; }

  registerCategories(){
    let ref = this.refInfo();
    let categorycode = this.fld.categorycodeN.value;
    let codeCategory2 = this.categoriesCode(categorycode.toUpperCase());
    console.log("codeCheck: "+codeCategory2);
    if(this.categForm.invalid){
      this.categInfo += "#\nData error..."+ref+"\n#"+this.randColor();
      return;
    }
    if ((codeCategory2 == false) || (codeCategory2 == null)) {
      this.categInfo += "#\nData error..."+ref+"\n#"+this.randColor()+"\n#categorycode: "+categorycode;
      console.log(this.categInfo);
      return;
    }
    console.log(this.categInfo);
    try {
      let log = {
        "categoryid": "",
        "categorycode": codeCategory2,
        "name": this.fld.nameN.value,
        "isactive": this.fld.isactiveN.value,
        "user": this.fld.userN.value,
      };
      let datad = JSON.stringify(log);
      console.log(datad);
      let info = this.dataService.registerCategories(datad);
      let dataR;
      info.subscribe(res => {
        console.log("res: "+res);
        dataR = res["Categories"] as string [];
        console.log("Categories: "+dataR);
        console.log("Categories: "+res["Categories"]);
        console.log("Time: "+res["Time"]);
        console.log("Token: "+res["Token"]);
        console.log("Error: "+res["Error"]);
        let dataERR = res["Error"] as string [];
        console.log("Error: "+dataERR);
        if (res["Categories"] == 1) {
          this.dataService.categories = {
            "categoryid": res["Categories"]["categoryid"],
            "categorycode": res["Categories"]["categorycode"],
            "name": res["Categories"]["name"],
            "isactive": res["Categories"]["isactive"],
            "user": res["Categories"]["user"],
          };
          //this.dataService.login = true;
          this.dataService.refn = res["Token"];
          this.dataService.token = res["Token"];
          this.router.navigate(['/products']);
        } else {
          this.categInfo = "System error:"+this.randColor();
        }
      });
      //
    } catch(e){
      console.log(e)
    }
  }

  categoriesCode(code){
    /*
    Check category code for each Category,
    containing 3 alphabet letters and three
    numeric characters e.g., ABC123.
    */
    let code1 = code.length;
    console.log("categoryCode: "+code+"\n#"+code1);
    if (code1 != 6) {
      return false;
    }
    let pattern01 = "^[a-zA-Z]{3}[0-9]{3}$";
    let attributes = "i";
    let pattern = new RegExp(pattern01, attributes);
    //let qcpp5 = pattern.exactMatch(code);
    let codeMatch = code.match(pattern);
    console.log("pattern: "+pattern+"\n#codeTest: "+code1+"\n#codeMatch: "+codeMatch);
    return codeMatch;
  }

  searchCategoryCode = async () =>{
    let ref = this.refInfo();
    let ccode = (<HTMLInputElement>document.getElementById("txtSearchCategoryCode")).value;
    let ccode2 = this.categoriesCode(ccode.toUpperCase());
    if ((ccode2 == false) || (ccode2 == null)) {
      this.categInfo += "#\nData error..."+ref+"\n#"+this.randColor()+"\n#categorycode: "+ccode;
      console.log(this.categInfo);
      return;
    }
    alert(ccode2);
  }

  allCategories = async () => {
    alert("AllCategories");
    this.categories = categoryInfo;
    return ["v", "p", "h"];
  }

  updateCategories = async (data) => {
    alert("updateCategories: "+data);
    return data;
  }

  deleteCategories = async (data) => {
    alert("deleteCategories: "+data);
    return [{}];
  }

  randColor() {
    let rColors = ["colors.red", "colors.green", "colors.blue", "colors.yellow"];
    let x = Math.random();
    let y = Math.floor(x * 300);
    let z = rColors.length;
    let xyz = y % z;
    console.log("x: "+x+", y: "+y+", z: "+z+"\n#xyz: y%z = "+xyz)
    return rColors[xyz];
  }

  refInfo(){
    let rfDate = new Date();
    return rfDate.getTime();
  }
}

const dbDateTime = () => {
  let now = new Date();
  return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

let searchCategoryCode = async () => {
  let ref = refInfo();
  let ccode = (<HTMLInputElement>document.getElementById("txtSearchCategoryCode")).value;
  let ccode2 = categoriesCode(ccode.toUpperCase());
  if ((ccode2 == false) || (ccode2 == null)) {
    let categInfo = "#\nData error..."+ref+"#\n#categorycode: "+ccode;
    console.log(categInfo);
    return;
  }
  alert(ccode2);
}

let allCategoriesXY = async () => {
  alert("AllCategoriesXT");
}

let categoriesCode = (code) => {
  /*
  Check category code for each Category,
  containing 3 alphabet letters and three
  numeric characters e.g., ABC123.
  */
  let code1 = code.length;
  console.log("categoryCode: "+code+"\n#"+code1);
  if (code1 != 6) {
    return false;
  }
  let pattern01 = "^[a-zA-Z]{3}[0-9]{3}$";
  let attributes = "i";
  let pattern = new RegExp(pattern01, attributes);
  //let qcpp5 = pattern.exactMatch(code);
  let codeMatch = code.match(pattern);
  console.log("pattern: "+pattern+"\n#codeTest: "+code1+"\n#codeMatch: "+codeMatch);
  return codeMatch;
}

let refInfo = () => {
  let rfDate = new Date();
  return rfDate.getTime();
}

let categoryInfo = [
{
  categoryid: 1,
  categorycode: "ICT321",
  name: "Information Systems.",
  isactive: "active",
  createdby: "Wms2022",
  modifiedby: "Wms2022",
  listdate: dbDateTime(),
  modified: dbDateTime(),
},
{
  categoryid: 2,
  categorycode: "PHD765",
  name: "Research & Development.",
  isactive: "active",
  createdby: "Wms2022",
  modifiedby: "Wms2022",
  listdate: dbDateTime(),
  modified: dbDateTime(),
},
{
  categoryid: 3,
  categorycode: "DIY921",
  name: "Electronics Digital Systems.",
  isactive: "active",
  createdby: "Wms2022",
  modifiedby: "Wms2022",
  listdate: dbDateTime(),
  modified: dbDateTime(),
},
];

//////////////////////////////////////
// products.component.ts
// @ Author Brian
////////////////////////////////////////


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
import { ProductsService } from '../objects/products.service';
import { UsersService } from '../objects/users.service';
import { OnlineService } from '../objects/online.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../app.component.css']
})
export class ProductsComponent implements OnInit {
  //
  //Create products instance.
  //
  prodSearchForm: FormGroup;
  prodForm: FormGroup;
  prodInfo;
  randInfo;
  productCode;
  name;
  email;
  token;
  login;
  systemInfo;
  dvdisplay;
  products;
  header = ["productid", "productcode", "name", "description", "categoryid",
    "price", "image", "spreadsheet", "createdby", "modifiedby", "listdate",
    "modified"];
  categoriesIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

  constructor(private formBuilder: FormBuilder,
    private dataService: ProductsService,
    private dataService02: UsersService,
    private dataService03: OnlineService,
    private router: Router) {
      this.randInfo = this.randColor();
      this.prodInfo = "Products: "+this.randInfo+",... ";
      this.productCode = this.productsCode();
      this.email = this.dataService02.email;
      this.name = this.dataService02.name;
      this.token = this.dataService02.token;
      this.login = this.dataService02.login;
      this.systemInfo = this.dataService03.navbarOnline();
      console.log("#03 systemInfo: "+this.systemInfo);
  }

  ngOnInit() {
    this.prodForm = this.formBuilder.group({
      productcodeN: ['',''],
      nameN: ['', Validators.required],
      descriptionN: ['', ''],
      categoryidN: ['', Validators.required],
      priceN: ['', Validators.required],
      imageFileN: ['', ''],
      spreadsheetFileN: ['', ''],
      userN: ['','']
    });
    this.dvdisplay = document.getElementById("productsDiv");
    this.allProducts();
  }

  get fld(){ return this.prodForm.controls; }

  registerProducts(){
    let rfDate = new Date();
    let ref = rfDate.getTime();
    if(this.prodForm.invalid){
      this.prodInfo += "#\nData error..."+ref+"\n#"+this.randColor()+"#\nprice: "+this.fld.priceN.value;
      return;
    }
    console.log(this.prodInfo);
    try {
      let log = {
        "productcode": this.fld.productcodeN.value,
        "name": this.fld.nameN.value,
        "description": this.fld.descriptionN.value,
        "categoryid": this.fld.categoryidN.value,
        "price": this.fld.priceN.value,
        "image": this.fld.productcodeN.value+"image.png",
        "spreadsheet": this.fld.productcodeN.value+"spreadsheet.txt",
        "user": "name: "+this.name+", email: "+this.email
      };
      let dataX = JSON.stringify(log);
      console.log(dataX);
      //
      //To upload files we nead a library for files at the backend.
      //We can use other frameworks that supports file handling e.g. Django, etc.
      //We can also create a file server and build a file uploading API.
      //
      let formDataX = new FormData();
      formDataX.append("dataX", dataX)
      const fileX1 = (<HTMLInputElement>document.getElementById("imageFile"));
      for(let i = 0; i < fileX1.files.length; i++){
        formDataX.append("imageFile", fileX1.files[i]);
        console.log(i+"imageFile: "+fileX1[i]);
      }
      const fileX2 = (<HTMLInputElement>document.getElementById("spreadsheetFile"));
      for(let i = 0; i < fileX2.files.length; i++){
        formDataX.append("spreadsheetFile", fileX2.files[i]);
        console.log(i+"spreadsheetFile: "+fileX2[i]);
      }
      //let info = this.dataService.registerProducts(formDataX);
      let info = this.dataService.registerProducts(dataX);
      let dataR;
      info.subscribe(res => {
        console.log("res: "+res);
        dataR = res["Products"] as string [];
        console.log("Products: "+dataR);
        console.log("Products: "+res["Products"]);
        console.log("Time: "+res["Time"]);
        console.log("Error: "+res["Error"]);
        let dataERR = res["Error"] as string [];
        console.log("Error: "+dataERR);
        if (res["Products"] == 1) {
          this.dataService.products = {
            "productid": res["Products"]["productid"],
            "productcode": res["Products"]["productcode"],
            "name": res["Products"]["name"],
            "description": res["Products"]["description"],
            "categoryid": res["Products"]["categoryid"],
            "price": res["Products"]["price"],
            "image": res["Products"]["image"],
            "spreadsheet": res["Products"]["spreadsheet"],
          };
          //this.dataService.login = true;
          this.dataService.refn = res["Token"];
          this.dataService.token = res["Token"];
          //this.router.navigate(['/products']);
        } else {
          this.prodInfo = "System error:"+this.randColor();
        }
      });
      //
    } catch(e){
      console.log(e)
    }
  }

  productsCode(){
    //
    //The frontend is used for testability generated productCode.
    //The backend unique generated productCode is the final one.
    //
    /*
    Each product should contain
    a uniquely generated product code
    including a year month and sequential
    code ‘yyyyMM-###’ e.g., 202111-023
    */
    let now = new Date();
    let monthX = now.getMonth()+1;
    let xy = this.randColor(true);
    let code1 = "yyyy:"+now.getFullYear()+"/MM:"+now.getMonth()+"-d"+now.getDate()+"-h"+now.getHours()+"-m"+now.getMinutes()+"-s"+now.getSeconds()+"";
    let code = now.getFullYear()+""+monthX+"-"+now.getDate()+""+now.getHours()+""+now.getMinutes()+""+now.getSeconds()+""+xy;
    console.log(now+"\n"+code1+" productCode: "+code);
    return code;
  }

  allProducts = async () => {
    //alert("AllProducts");
    this.products = wmsProducts;
    //allProducts(this.dvdisplay, this.header, this.categoriesIds, "products");
    allProducts(this.dvdisplay, this.header, wmsProducts, "products");
    return ["cool", "banana"];
  }

  updateProducts = async (data="0") => {
    alert("updateProducts: "+data);
    //allProducts(this.dvdisplay, this.categoriesIds, "products");
    return ["cool", "banana"];
  }

  productsPagenation = async () => {
    try{
      //checkPoducts();
      console.log("checkPoducts();");
    } catch(e){
      console.log(e)
    }
  }

  deleteProducts = async (data="0") => {
    alert("deleteProducts: "+data);
    //allProducts(this.dvdisplay, this.categoriesIds, "products");
    return ["cool", "banana"];
  }

  allCategories = async () => {
    alert("AllCategories");
    return ["v", "w", "h", "o"];
  }

  searchCategoryID = async () =>{
    alert("searchCategoryID");
    return [1,2,3,4,5,6,7,8,9];
  }

  randColor(dxy=false) {
    let rColors = ["colors.red", "colors.green", "colors.blue", "colors.yellow"];
    let x = Math.random();
    let y = Math.floor(x * 300);
    let z = rColors.length;
    let xyz = y % z;
    console.log("x: "+x+", y: "+y+", z: "+z+"\n#xyz: y%z = "+xyz)
    if(dxy) {
      return y;
    }
    return rColors[xyz];
  }
}

let productCode = () => {
  let now = new Date();
  let monthX = now.getMonth()+1;
  let x = Math.random();
  let xy = Math.floor(x * 300);
  let code1 = "yyyy:"+now.getFullYear()+"/MM:"+now.getMonth()+"-d"+now.getDate()+"-h"+now.getHours()+"-m"+now.getMinutes()+"-s"+now.getSeconds()+"";
  let code = now.getFullYear()+""+monthX+"-"+now.getDate()+""+now.getHours()+""+now.getMinutes()+""+now.getSeconds()+""+xy;
  console.log(now+"\n"+code1+" productCode: "+code);
  return code;
};

const dbDateTime = () => {
  let now = new Date();
  return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

let updateProducts = async (data) => {
  alert("updateProducts: "+data);
  //allProducts(this.dvdisplay, this.categoriesIds, "products");
  return ["cool", "banana"];
}

let deleteProducts = async (data) => {
  alert("deleteProducts: "+data);
  //allProducts(this.dvdisplay, this.categoriesIds, "products");
  return ["cool", "banana"];
}

let allProducts = async (dvdisplay, header, dvlist, info) => {
  dvdisplay.innerHTML = "<hr><br><h1>"+info+"</h1>";
  let table = document.createElement("table");
  let tr = table.insertRow(-1);
  let v1 = "1001.jpg";
  let v2 = "pro1.jpg";
  let v3 = "pro13.jpg";
  let v4 = "pro4.jpg";
  let v5 = "pro2020.jpg";
  let v6;
  let v7;
  let v8;
  let imageUrl;
  let imageUrl01 = "http://localhost:9080/imagelink";
  let imageUrl02 = "https://localhost:9090/imagelink/2";
  for(let i = 0; i < header.length; i++){
    let th = document.createElement("th");
    th.innerHTML = '<b>'+header[i]+'</b>';
    tr.appendChild(th);
  }
  for(let i = 0; i < dvlist.length; i++){
    tr = table.insertRow(-1);
    v6 = (i % 2) ? "green" : "brown";
    tr.style.backgroundColor = v6;
    tr.style.borderBottom = "1px solid #bcd";
    let plist = dvlist[i];
    for(let j = 0; j < header.length; j++){
      let td = tr.insertCell(-1);
      if (j < header.length - 1) {
        //td.innerHTML = dvlist[i];
        td.innerHTML = '<td><input type="text" id="txtProduct'+i+""+j+'" name="txtProduct'+i+""+j+'" value="'+dvlist[i][header[j]]+'"/></td>';
      }
      else {
        td.innerHTML += '<td><label (click)="updateProducts(plist)">update'+i+""+j+'...</label></td>';
        td.innerHTML += '<td><label (click)="deleteProducts(plist)">delete'+i+""+j+'</label></td>';
        v7 = (i % 2 == 0) ? v4 : v1;
        v8 = (i % 5 == 0) ? v5 : v7;
        imageUrl = (i % 2 == 0) ? imageUrl01 : imageUrl02;
        let td2 = tr.insertCell(-1);
        td2.innerHTML = '<td><label class="lblPoductImage"><img src="/assets/'+v8+'" alt="wms"></label></td>';
        let td3 = tr.insertCell(-1);
        td3.innerHTML = '<td><label class="lblPoductImage"><img src="'+imageUrl+'" alt="wms"></label></td>';
      }
    }
  }
  dvdisplay.appendChild(table);
  dvdisplay.innerHTML = dvdisplay.innerHTML + "<br><hr><br>";
  //
  alert("AllProducts");
  lblimageDisplay(table);

}

let allCategories = async () => {
  alert("AllCategories");
}

let searchCategoryID = async () => {
  alert("searchCategoryID");
}

let wmsProducts = [
{
  productid: 1,
  productcode: productCode(),
  name: "wmsapp",
  description: "Warehouse managment system application.",
  categoryid: 1,
  price: 3210.99,
  image: "wmsapp1.png",
  spreadsheet: "wmsapp1.txt",
  createdby: "Wms2022, wms2022@wmsapp.org",
  modifiedby: "Wms2022, wms2022@wmsapp.org",
  listdate: dbDateTime(),
  modified: dbDateTime(),
},
{
  productid: 2,
  productcode: productCode(),
  name: "wmsapp20",
  description: "Warehouse managment system application20.",
  categoryid: 1,
  price: 4210.99,
  image: "wmsapp202.png",
  spreadsheet: "wmsapp202.txt",
  createdby: "Wms2022, wms2022@wmsapp.org",
  modifiedby: "Wms2022, wms2022@wmsapp.org",
  listdate: dbDateTime(),
  modified: dbDateTime(),
},
{
  productid: 3,
  productcode: productCode(),
  name: "diyapp20",
  description: "Ecommerce web managment system.",
  categoryid: 3,
  price: 54210.99,
  image: "diyapp202.png",
  spreadsheet: "diyapp202.txt",
  createdby: "Wms2022, wms2022@wmsapp.org",
  modifiedby: "Wms2022, wms2022@wmsapp.org",
  listdate: dbDateTime(),
  modified: dbDateTime(),
},
];

let pg = 10;

function init(){
  let sern = dbDateTime();
  let info = navigator.appName;
  console.log("info: "+info, sern);
}

let checkProducts = async  (orderby="name", page=1, limit=10) => {
  let url1 = window.location.href;
  let url22 = url1+"products";
  let urlp = "/products?orderby="+orderby+"&page="+page+"&limit="+limit+"&dbtime="+dbDateTime();
  let paginator = "/products?paginator=name,"+orderby+","+page+","+limit+",data,orderby,page,limit,product"+dbDateTime();
  console.log(dbDateTime(), url22, urlp);
  let dy = new Date();
  let db = await fetch(paginator, {
      method: 'GET',
      headers: {'Content-type':'application/json; charset=UTF-8'}
    }).then((response) => {
    console.log("response: ", response);
    //ckodbprogres.value += 5;
    //dvlog(response);
    return response.text();
  }).then((dblist) => {
    let d1 = JSON.stringify(dblist);
    let db2 = JSON.parse(dblist);
    console.log("db2: ", db2, dblist.length);
    //ckodbprogres.value += 5;
    //dvresults.innerHTML = dblist.length;
    //displayResultsApp("dvdisplay", db2, "header", db2.length);
    //xpage = page;
    //btnperson.innerHTML = "Check #"+xpage++;
    //dvlog(d1);
    //dvlog(db2);
    return db2;
  }).catch((error) => {
    console.log("db3: @", error);
    //ckodbprogres.value = 3;
  }).finally(() => {
    let d2 = new Date();
    //let d3 = (d2 - dy);
    console.log(d2+" #\n "+dy);
    //ckodbprogres.value += 10;
    //pg /= 2;
    //dvlog({"d3": d3});
  });
}


let lblimage = null;
let lblimageDisplay = async (element) => {
  try {
    //lblimage = (<HTMLInputElement>document.querySelector("#lblPoductImage"));
    if(element){
     element.style.borderCollapse = "collapse";
     element.style.height = "50%";
     element.style.width = "50%";
     element.style.border = "2px solid #abc";
     element.style.fontSize = "12px";
    }
  } catch (e){
    console.log(e);
  }
};

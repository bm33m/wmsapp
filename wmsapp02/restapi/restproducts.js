////////////////////////////////////////////
//
// restproducts.js
// Author: Brian M
//
///////////////////////////////////////////

let url = require('url');
const db = require('../services/dbpool');
const dbvalidator = require('../services/dbvalidators');
const onlineuser = require('./onlineusers');


let pc = 0;
let pc2 = 0;
let pc3 = 0;
let pc10 = 0;
let pid = 5000;

const postProducts = async (req, res) => {
  console.log(dbvalidator.dbDateTime()+"#1 Post products#"+pc++);
  try {
    console.log("url: "+req.url);
    let vars = url.parse(req.url, true);
    console.log("vars: ", vars);
    let data = vars.query;
    console.log("data: ", data["data"]);
    let data2 = JSON.parse(data["data"]);
    //const {productcode, name, description, categoryid, price, image, spreadsheet, user, token} = data2;
    //
    // To upload files we nead a library for files.
    // We can use other frameworks that supports file handling e.g. Django, etc.
    // We can also create a file server and build a file uploading API.
    //
    const {productcode, name, description, categoryid, price, email, token} = data2;
    let online = onlineuser.onlineUsers(email, token);
    let productcode0 = dbvalidator.generateProductCode();
    let name1 = dbvalidator.checkData(name);
    let description2 = dbvalidator.checkData(description);
    let categoryid3 = dbvalidator.checkNumber(categoryid);
    let price4 = dbvalidator.checkNumber(price);
    let user5 = dbvalidator.checkData(user);
    let token6 = dbvalidator.checkData(token);
    let online2 = await online;
    if (online2 != 1){
      res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc++, name1);
      return 0;
    }
    let promise1 = [productcode0, name1, description2, categoryid3, price4, user5, token6];
    let image10 = promise1[1]+promise1[0]+".png";
    let spreadsheet10 =  promise1[1]+promise1[0]+".txt";
    if((promise1[0] == "") || (promise1[1] == "") || (promise1[3] == "") || (promise1[4] == "") || (promise1[5] == "") || (promise1[6] == "") ||
      (promise1[0] == null) || (promise1[1] == null) || (promise1[3] == null) || (promise1[4] == null) || (promise1[5] == null) || (promise1[6] == null)){
      res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc++, name1);
      return 0;
    }
    let hashData = await dbvalidator.db3hashData(promise1[0]+"+"+promise1[6]);
    console.log(hashData);
    //
    let sqlString = 'INSERT INTO products (productcode, name, description, categoryid, price, image, spreedsheet, createdby) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    //            [productcode0,  name1,     description2, categoryid3,  price4,                              user5]
    let sqlValues = [promise1[0], promise1[1], promise1[2], promise1[3], promise1[4], image10, spreedsheet10, promise1[5]];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" postProducts dberror: "+pc++, err);
        res.json({Action: 0, Products: "dberror"+pc++, Time: dbvalidator.dbTime(), Error: err});
      } else {
        console.log(dbvalidator.dbTime(), "#3 postProducts: "+pc++, results["rowCount"]);
        res.json({Action: 1, Products: results["rowCount"], Time: dbvalidator.dbTime(), Error: "error: 0, info: "+pc});
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#4 postProducts : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#5 postProducts Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"###6 postP Done: ###"+pc++);
};


const getProductsByID = async (req, res) => {
  try {
    console.log(dbvalidator.dbTime()+"#1 Get products# "+pc2++);
    const pid = parseInt(req.params.pid)
    console.log(dbvalidator.dbTime(), req.query);
    var page = req.query.paginator;
    var pg = await dbvalidator.dbpaginator(page);
    if ((pg[0] == 0) || isNaN(pid) ) {
      console.log(dbvalidator.dbTime()+" Products dberror: "+pc2++);
      res.json({Action: 0, Products: "dberror"+pc++, Time: dbvalidator.dbTime(), Error: err});
      return 0;
    }
    console.log(dbvalidator.dbTime()+"#2 SELECT ... personid: "+pid+", orderby: "+pg[0]+",offset: "+pg[1]+", limit: "+pg[2]+", "+pc2++);
    db.pool.query(dbsql(pg[0]), [pid, pg[1], pg[2]], (err, resp) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" Contacts dberror: "+pc2++, err);
        res.json({Action: 0, Products: "dberror"+pc++, Time: dbvalidator.dbTime(), Error: err});
        return 0;
      } else {
        console.log(dbvalidator.dbTime()+"#3 Products: "+pc2++, resp["rows"]);
        res.json({Action: 1, Products: "dberror"+pc++, Time: dbvalidator.dbTime(), Error: err});
        return 0;
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+" getProductsBypid: "+pc2++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#4 getProductsBypid Done: "+pc2++);
  }
};

const deleteProducts = async (req, res) => {
  try {
    console.log(dbvalidator.dbTime()+"#1 deleteProducts #"+pc2++);
    //const {productid, producode, name} = req.body;
    console.log("url: "+req.url);
    let vars = url.parse(req.url, true);
    console.log("vars: ", vars);
    let data = vars.query;
    console.log("data: ", data["data"]);
    let data2 = JSON.parse(data["data"]);
    const {productid, productcode, name, description, categoryid, price, email, token} = data2;
    let online = onlineuser.onlineUsers(email, token);
    let productid0 = dbvalidator.checkNumber(productid);
    let productcode1 = dbvalidator.checkData(productcode);
    let promise1 = [await productid0, await productcode1];
    if((promise1[0] == "") || (promise1[1] == "") || (promise1[0] == null) || (promise1[1] == null)) {
      res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc2++);
      return 0;
    }
    let online2 = await online;
    if (online2 != 1){
      res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc++, name1);
      return 0;
    }
    db.pool.query('DELETE FROM products WHERE productid = $1 AND productcode = $2', [promise1[0], promise1[1]], (err, resp) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" deleteProducts dberror: "+pc2++);
        res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      } else {
        console.log(dbvalidator.dbTime()+"#2 deleteProducts: "+pc2++, resp.rows);
        res.json({Action: 1, Products: resp.rows, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+" deleteProducts: "+pc2++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#3 deleteProducts Done: "+pc2++);
  }
};


const getProducts = async (req, res) => {
  console.log(dbvalidator.dbTime()+" Get products# "+pc2++);
  console.log(dbvalidator.dbTime(), req.query);
  var paginator = req.query.paginator;
  var pg = await dbvalidator.dbpaginator(paginator);
  if (pg[0] == 0) {
    console.log(dbvalidator.dbTime(), "dberror: "+pc2++);
    res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
    return 0;
  }
  console.log(dbvalidator.dbTime()+" orderby: "+pg[0], "offset: "+pg[1], "limit: "+pg[2]);
  db.pool.query(dbsqlProducts(pg[0]), [pg[1], pg[2]], (err, resp) => {
    if (err) {
      console.log(dbvalidator.dbTime()+" dberror: "+pc2++, err);
      res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
    } else {
      console.log(dbvalidator.dbTime(), resp["rows"].length, "PrpductsList: "+pc2++);
      let db1 = JSON.stringify(resp["rows"]);
      let db2 = (resp["rows"].length > 0) ? 1 : 0;
      res.json({Action: db2, Products: resp["rows"], Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(db1);
    }
  });
};

const putProducts = async (req, res) => {
  console.log(dbvalidator.dbTime()+"#1 updateProducts #"+pc++);
  try {
    console.log("url: "+req.url);
    let vars = url.parse(req.url, true);
    console.log("vars: ", vars);
    let data = vars.query;
    console.log("data: ", data["data"]);
    let data2 = JSON.parse(data["data"]);
    const {productid, productcode, name, description, categoryid, price, image, spreadsheet} = data2;
    let productid0 = dbvalidator.checkNumber(productid);
    let productcode1 = dbvalidator.generateProductCode();
    let name2 = dbvalidator.checkData(name);
    let description3 = dbvalidator.checkData(description);
    let categoryid4 = dbvalidator.checkNumber(categoryid);
    let price5 = dbvalidator.checkNumber(price);
    let promise1 = [await productid0, await productcode1, await name2, await description3, await categoryid4, await price5];
    let image2 = promise1[2]+promise1[0]+".png";
    let spreadsheet2 =  promise1[2]+promise1[0]+".txt";
    if((promise1[0] == "") || (promise1[1] == "") || (promise1[2] == "") || (promise1[4] == "") || (promise1[5] == "") ||
      (promise1[0] == null) || (promise1[1] == null) || (promise1[2] == null) || (promise1[4] == null) || (promise1[5] == null)){
      res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc++, name2);
      return 0;
    }
    //let hashData = await db3hashData(email2+"+"+password2);
    //console.log(dbTime()+"\n#hashData: "+hashData+"#2 postPerson "+pc++, name2, email2);
    let sqlString = 'UPDATE products SET producode = $1, name = $2, description = $3, categoryid = $4, price = $5, image = $6, spreedsheet = $7, modifiedby = $8, modified = $9 WHERE productid = $10';
    // [productid0, productcode1, name2,      description3, categoryid4, price5]
    let sqlValues = [promise1[1], promise1[2], promise1[3], promise1[4], promise1[5], image2, spreedsheet2, modifiedby2, dbvalidator.dbDate(), promise1[0]];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" putProducts dberror: "+pc++, err);
        res.json({Action: 0, Products: "dberror"+pc++, Time: dbvalidator.dbTime(), Error: err});
      } else {
        console.log(dbvalidator.dbTime(), "#3 putProducts: "+pc++, results["rowCount"]);
        res.json({Action: 1, Peoducts: results["rowCount"], Time: dbvalidator.dbTime(), Error: "error: 0, info: "+pc});
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#4 putProducts : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#5 putProducts Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"###6 putP Done: ###"+pc++);
};

let downloadProducts = async (req, res) =>{
  try {
    console.log("downloadProducts: "+dbvalidator.dbTime());
    console.log("url: "+req.url);
    let vars = url.parse(req.url, true);
    console.log("vars: ", vars);
    let data = vars.query;
    console.log("data: ", data["data"]);
    let data2 = JSON.parse(data["data"]);
    console.log(data2);
    const {productid, productcode, name, description, categoryid, price, email, token} = data2;
    let online = onlineuser.onlineUsers(email, token);
    let productid0 = dbvalidator.checkNumber(productid);
    let name1 = dbvalidator.checkData(name);
    let promise1 = [await productid0, await name1];
    if((promise1[0] == "") || (promise1[1] == "") || (promise1[0] == null) || (promise1[1] == null)) {
      res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc2++);
      return 0;
    }
    let online2 = await online;
    if (online2 != 1){
      res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc++, name1);
      return 0;
    }
    //res.download('../info/'+promise1[1]+promise1[0]+'.txt');
    res.download('../info/info.txt');
  } catch (e) {
    console.log("downloadProducts: "+dbvalidator.dbTime()+"\n"+e);
  } finally {
    console.log("downloadProducts: "+dbvalidator.dbTime());
  }
};

function dbsqlProducts(orderby = "productcode"){
  if ( orderby == "productcode") {
    return 'SELECT * FROM products ORDER BY productcode OFFSET $1 LIMIT $2';
  } else if ( orderby == "productid") {
    return 'SELECT * FROM products ORDER BY productid OFFSET $1 LIMIT $2';
  } else if ( orderby == "categoryid") {
    return 'SELECT * FROM products ORDER BY categoryid OFFSET $1 LIMIT $2';
  } else if ( orderby == "price") {
    return 'SELECT * FROM products ORDER BY price OFFSET $1 LIMIT $2';
  } else if ( orderby == "name") {
    return 'SELECT * FROM products ORDER BY name OFFSET $1 LIMIT $2';
  }
}


module.exports = {
  postProducts,
  putProducts,
  getProducts,
  deleteProducts,
  downloadProducts
}

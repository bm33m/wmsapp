////////////////////////////////////////////
//
// restcategories.js
// Author: Brian M
//
///////////////////////////////////////////

let url = require('url');
const db = require('../services/dbpool');
const dbvalidator = require('../services/dbvalidators');


let pc = 0;
let pc2 = 0;
let pc3 = 0;
let pc10 = 0;
let pid = 5000;

const postCategories = async (req, res) => {
  console.log(dbvalidator.dbTime()+"#1 Post categories#"+pc++);
  try {
    //const {name, surname, email, password, isactive} = req.body;
    console.log("url: "+req.url);
    let vars = url.parse(req.url, true);
    console.log("vars: ", vars);
    let data = vars.query;
    console.log("data: ", data["data"]);
    let data2 = JSON.parse(data["data"]);
    const {categorycode, name, isactive} = data2;
    let categorycode2 = dbvalidator.checkCategoryCode(toUpperCase(categorycode));
    let name2 = dbvalidator.checkData(name);
    let isactive2 = dbvalidator.checkData(isactive);
    await { categorycode2, name2, isactive2 }
    if((name2 == "") || (categorycode2 == "") || (isactive2 == "") ||
      (name2 == null) || (categorycode2 == null) || (isactive2 == null)){
      res.json({Action: 0, Categories: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc++, name2);
      return 0;
    }
    //
    let sqlString = 'INSERT INTO categories (categorycode, name, isactive) VALUES ($1, $2, $3)';
    let sqlValues = [categorycode2, name2, isactive2];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" postCategories dberror: "+pc++, err);
        res.json({Action: 0, Categories: "dberror"+pc++, Time: dbvalidator.dbTime(), Error: err});
      } else {
        console.log(dbvalidator.dbTime(), "#3 postCategories: "+pc++, results["rowCount"]);
        res.json({Action: 1, Categories: results["rowCount"], Time: dbvalidator.dbTime(), Error: "error: 0, info: "+pc});
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#4 postCategories : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#5 postCategories Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"###6 postC Done: ###"+pc++);
};


const getCategoriesByID = async (req, res) => {
  try {
    console.log(dbvalidator.dbTime()+"#1 Get categories# "+pc2++);
    const pid = parseInt(req.params.pid)
    console.log(dbvalidator.dbTime(), req.query);
    var page = req.query.paginator;
    var pg = dbvalidator.dbpaginator(page);
    if ((pg[0] == 0) || isNaN(pid) ) {
      console.log(dbvalidator.dbTime()+" Categories dberror: "+pc2++);
      res.json({Action: 0, Categories: "dberror"+pc++, Time: dbvalidator.dbTime(), Error: err});
      return 0;
    }
    console.log(dbvalidator.dbTime()+"#2 SELECT ... personid: "+pid+", orderby: "+pg[0]+",offset: "+pg[1]+", limit: "+pg[2]+", "+pc2++);
    db.pool.query(dbsql(pg[0]), [pid, pg[1], pg[2]], (err, resp) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" Categories dberror: "+pc2++, err);
        res.json({Action: 0, Categories: "dberror"+pc++, Time: dbvalidator.dbTime(), Error: err});
        return 0;
      } else {
        console.log(dbvalidator.dbTime()+"#3 Categories: "+pc2++, resp["rows"]);
        res.json({ Action: 1, Categories: "dberror"+pc++, Time: dbvalidator.dbTime(), Error: err });
        return 0;
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+" getCategoriesByID: "+pc2++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#4 getCategoriesByID Done: "+pc2++);
  }
};

const getCategories = async (req, res) => {
  console.log(dbvalidator.dbTime()+" Get categories# "+pc2++);
  console.log(dbvalidator.dbTime(), req.query);
  var paginator = req.query.paginator;
  var pg = await dbvalidator.dbpaginator(paginator);
  if (pg[0] == 0) {
    console.log(dbvalidator.dbTime(), "dberror: "+pc2++);
    res.json({Action: 0, Categories: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
    return 0;
  }
  console.log(dbTime()+" orderby: "+pg[0], "offset: "+pg[1], "limit: "+pg[2]);
  db.pool.query(dbsqlCategories(pg[0]), [pg[1], pg[2]], (err, resp) => {
    if (err) {
      console.log(dbvalidator.dbTime()+" dberror: "+pc2++, err);
      res.json({Action: 0, Categories: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
    } else {
      console.log(dbvalidator.dbTime(), resp["rows"].length, "PrpductsList: "+pc2++);
      let db1 = JSON.stringify(resp["rows"]);
      let db2 = (resp["rows"].length > 0) ? 1 : 0;
      res.json({Action: db2, Categories: resp["rows"], Time: dbTime(), Error: "error: "+pc});
      console.log(db1);
    }
  });
};

const putCategories = async (req, res) => {
  console.log(dbvalidator.dbTime()+"#1 updateCategories #"+pc++);
  try {
    //const {name, surname, email, password, isactive} = req.body;
    console.log("url: "+req.url);
    let vars = url.parse(req.url, true);
    console.log("vars: ", vars);
    let data = vars.query;
    console.log("data: ", data["data"]);
    let data2 = JSON.parse(data["data"]);
    const {productcode, name, description, categoryid, price, image, spreadsheet} = data2;
    //let productcode2 = generateProductCode();
    let name2 = dbvalidator.checkData(name);
    let description2 = dbvalidator.checkData(description);
    let categoryid2 = dbvalidator.checkData(categoryid);
    let image2 = "image.file.name";
    let spreadsheet2 =  "spreadsheet.file.name";
    await { name2, description2, categoryid2 }
    if((name2 == "") || (categoryid2 == "") || (price2 == "") ||
      (name2 == null) || (categoryid2 == null) || (price2 == null)) {
      res.json({Action: 0, Products: "dataError"+pc++, Time: dbvalidator.dbTime(), Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc++, name2);
      return 0;
    }
    //
    let sqlString = 'UPDATE categories SET categorycode = $1, name = $2, isactive = $3, modifiedby = $4, modified = $5 WHERE categoryid = $9';
    let sqlValues = [categorycode2, name2, isactive2, modifiedby, dbvalidator.dbDate(), categoryid2];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" postProducts dberror: "+pc++, err);
        res.json({Action: 0, Products: "dberror"+pc++, Time: dbTime(), Error: err});
      } else {
        console.log(dbTime(), "#3 postProducts: "+pc++, results["rowCount"]);
        res.json({Action: 1, Peoducts: results["rowCount"], Time: dbTime(), Error: "error: 0, info: "+pc});
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#4 postProducts : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#5 postProducts Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"###6 postP Done: ###"+pc++);

};

function dbsqlCategories(orderby = "categorycode"){
  if ( orderby == "categorycode") {
    return 'SELECT * FROM categories ORDER BY categorycode OFFSET $1 LIMIT $2';
  } else if ( orderby == "categoryid") {
    return 'SELECT * FROM categories ORDER BY categoryid OFFSET $1 LIMIT $2';
  } else if ( orderby == "name") {
    return 'SELECT * FROM categories ORDER BY name OFFSET $1 LIMIT $2';
  } else if ( orderby == "isactive") {
    return 'SELECT * FROM categories ORDER BY isactive OFFSET $1 LIMIT $2';
  }
}

//Time.
const dbTime = () => {
  var now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

module.exports = {
  postCategories,
  putCategories,
  getCategories,
  getCategoriesByID
}

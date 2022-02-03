////////////////////////////////////////////
//
// restusers.js
// Author: Brian M
//
///////////////////////////////////////////

let url = require('url');
const db = require('../services/dbpool');
const dbvalidator = require('../services/dbvalidators');
const dbmail = require('./restmail');
const onlineuser = require('./onlineusers');

let pc = 0;
let pc2 = 0;
let pc3 = 0;
let pc10 = 0;
let pid = 5000;

const postUsers = async (req, res) => {
  console.log(dbvalidator.dbDateTime()+"#1 Post user#"+pc++);
  try {
    //const {name, surname, email, password, isactive} = req.body;
    //console.log("url: "+req.url);
    let vars = url.parse(req.url, true);
    //console.log("vars: ", vars);
    let data = vars.query;
    //console.log("data: ", data["data"]);
    let data2 = JSON.parse(data["data"]);
    const {name, surname, email, password, isactive} = data2;
    let name2 = dbvalidator.checkData(name);
    let surname2 = dbvalidator.checkData(surname);
    let email2 = dbvalidator.checkData(email);
    let password2 = dbvalidator.checkData(password);
    let isactive2 = dbvalidator.checkData(isactive);
    let token = dbvalidator.db3Data();
    let promise1 = [await name2, await surname2, await email2, await password2, await isactive2];
    let email3 = promise1[2];
    let password3 = promise1[3];
    let hashData = dbvalidator.db3hashData(email3+"+"+password3);
    if((promise1[0] == "") || (promise1[2] == "") || (promise1[3] == "") || (promise1[4] == "") ||
      (promise1[0] == null) || (promise1[2] == null) || (promise1[3] == null) || (promise1[4] == null)){
      res.json({Register: 0, Users: "dataError"+pc++, Time: dbvalidator.dbTime(), Token: "#000", Error: "error: "+pc});
      console.log(dbvalidator.dbTime()+" Done 0000..."+pc++, name2);
      return 0;
    }
    let sqlString = 'INSERT INTO users (name, surname, email, password, isactive) VALUES ($1, $2, $3, $4, $5)';
    let promise2 =  [await hashData, await token];
    let sqlValues = [promise1[0], promise1[1], promise1[2], promise2[0], promise1[4]];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" postUsers dberror: "+pc++, err);
        res.json({Register: 0, Users: "dberror"+pc++, Time: dbvalidator.dbTime(), Token: "#001", Error: err});
      } else {
        let subject = "#3 wmsapp Registration: "+pc++;
        let message = "<h1>"+subject+"</h1>\n"+dbvalidator.dbDateTime()+"\n"+results["rowCount"]+"\n"+"\nRef: "+promise2[1]+"\n"+dbvalidator.dbDate();
        console.log(message);
        res.json({Register: 1, Users: results["rowCount"], Time: dbvalidator.dbTime(), Token: promise2[1], Error: "error: 0, info: "+pc});
        //              name,        email,       subject, message
        dbmail.postMail(promise1[0], promise1[2], subject, message);
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#4 postUsers : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#5 postUsers Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"###6 postU Done: ###"+pc++);
};

const loginUsers = async (req, res) => {
  console.log(dbvalidator.dbDateTime()+"#01 loginUsers #"+pc++);
  try {
    //const {email, password} = req.body;
    //console.log("url: "+req.url);
    let vars = url.parse(req.url, true);
    //console.log("vars: ", vars);
    let data = vars.query;
    //console.log("data: ", data["data"]);
    let data2 = JSON.parse(data["data"]);
    const {email, password} = data2;
    //const email = data2["email"];
    //const password = data2["password"];
    //console.log(dbTime()+"#002a data2: "+data2+"#\n#002b   loginUser email: "+email);
    let email2 = dbvalidator.checkData(email);
    let password2 = dbvalidator.checkData(password);
    let token = dbvalidator.db3Data();
    let promise1 = [await email2, await password2];
    let email3 = promise1[0];
    let password3 = promise1[1];
    let hashData = dbvalidator.db3hashData(email3+"+"+password3);
    if((email3 == "") || (password3 == "") || (email3 == null) || (password3 == null)){
      res.json({Login: 0, Users: "dataError"+pc++, Time: dbTime(), Token: "#0001", Error: "error: "+pc});
      console.log(dbTime()+" Done 0000..."+pc++, email3);
      return 0;
    }
    let sqlString = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    let promise2 = [await hashData, await token ];
    let hashData2 = promise2[0];
    let token2 = promise2[1];
    let sqlValues = [email3, hashData2];
    console.log(email3, hashData2);
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" loginUsers dberror: "+pc++, err);
        res.json({Login: 0, Users: "dberror"+pc++, Time: dbvalidator.dbTime(), Token: "#0002", Error: err});
      } else {
        let resultsRows = results["rows"];
        let resultsLength = results["rows"].length;
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#3 wmsapp Login: "+pc++
        let message = "<h1>"+subject+"</h1>\n"+dbvalidator.dbDateTime()+"\n"+resultsRows+"\n"+resultsLength+"\nRef: "+token2+"\n"+dbvalidator.dbDate();
        console.log(message);
        if(dblogin2 == 1){
          //              name,         email,  subject, message
          dbmail.postMail("WmsappUser", email3, subject, message);
          onlineuser.onlineUsers(email3, token2);
        }
        res.json({Login: dblogin2, Users: results["rows"], Time: dbvalidator.dbTime(), Token: token2, Error: "error: 0, info: "+pc});
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#05 loginUsers : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#06 loginUsers Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"### 07 ### loginUsers Done: ###"+pc++);
};

let onlineusers = async (user, token) => {
  let hashData = await dbvalidator.db3hashData(user+"+"+token);
  console.log(hashData);
};

let logoutusers = async (req, res) => {
  console.log(dbvalidator.dbDateTime()+"#01 logoutUsers #"+pc++);
  try {
    //const {email, password} = req.body;
    //console.log("url: "+req.url);
    let vars = url.parse(req.url, true);
    console.log("vars: ", vars);
    let data = vars.query;
    //console.log("data: ", data["data"]);
    let data2 = JSON.parse(data["data"]);
    const {email, token} = data2;
    let email2 = dbvalidator.checkData(email);
    let token2 = dbvalidator.checkData(token);
    let promise1 = [await email2, await token2];
    let email3 = promise1[0];
    let token3 = promise1[1];
    let hashData = dbvalidator.db3hashData(email3+"+"+token3);
    if((email3 == "") || (token3 == "") || (email3 == null) || (token3 == null)){
      res.json({Login: 0, Users: "dataError"+pc++, Time: dbvalidator.dbTime(), Token: "#0001", Error: "error: "+pc});
      console.log(dbTime()+" Done 0000..."+pc++, email3);
      return 0;
    }
    let sqlString = 'SELECT * FROM onlineusers WHERE email = $1 AND token = $2';
    let sqlValues = [email3, token3];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" loginUsers dberror: "+pc++, err);
        res.json({Login: 0, Users: "dberror"+pc++, Time: dbvalidator.dbTime(), Token: "#0002", Error: err});
      } else {
        console.log(hashData2, token2);
        let resultsRows = results["rows"];
        let resultsLength = results["rows"].length;
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#3 wmsapp Login: "+pc++
        let message = "<h1>"+subject+"</h1>\n"+dbvalidator.dbDateTime()+"\n"+resultsRows+"\n"+resultsLength+"\nRef: "+token2+"\n"+dbvalidator.dbDate();
        console.log(message);
        if(dblogin2 == 1){
          //              name,   email,  subject, message
          dbmail.postMail("WmsappUser", email3, subject, message);
          onlineusers(email3, token2);
        }
        res.json({Login: dblogin2, Users: results["rows"], Time: dbvalidator.dbTime(), Token: token2, Error: "error: 0, info: "+pc});
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#05 loginUsers : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#06 loginUsers Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"### 07 ### loginUsers Done: ###"+pc++);
};

function dbsql(orderby = "email"){
  if ( orderby == "id") {
    return 'SELECT * FROM users ORDER BY id OFFSET $1 LIMIT $2';
  } else if ( orderby == "name") {
    return 'SELECT * FROM users ORDER BY name OFFSET $1 LIMIT $2';
  } else if ( orderby == "surname") {
    return 'SELECT * FROM users ORDER BY surname OFFSET $1 LIMIT $2';
  }
  return 'SELECT * FROM users ORDER BY email OFFSET $1 LIMIT $2';
}

module.exports = {
  postUsers,
  loginUsers
}

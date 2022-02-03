////////////////////////////////////////////
//
// onlineusers.js
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


let onlineUsers = async (email, token) => {
  console.log(dbvalidator.dbDateTime()+"#01 onlineusers #"+pc++);
  try {
    let email2 = dbvalidator.checkData(email);
    let token2 = dbvalidator.checkData(token);
    let promise1 = [await email2, await token2];
    let email3 = promise1[0];
    let token3 = promise1[1];
    let hashData = dbvalidator.db3hashData(email3+"+"+token3);
    if((email3 == "") || (token3 == "") || (email3 == null) || (token3 == null)){
      console.log(dbvalidator.dbTime()+" onlineusers 0000..."+pc++, email3);
      return 0;
    }
    let sqlString = 'SELECT * FROM onlineusers WHERE email = $1 AND token = $2';
    let token4 = await hashData;
    let sqlValues = [email3, token4];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" onlineusers dberror: "+pc++, err);
        return 0;
      } else {
        console.log(email3, token4);
        let resultsRows = results["rows"];
        let resultsLength = results["rows"].length;
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        console.log(resultsRows);
        return dblogin2;
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#05 onlineusers : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#06 onlineusers Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"### 07 ### onlineusers Done: ###"+pc++);
};

let onlineLogin = async (email, token) => {
  console.log(dbvalidator.dbDateTime()+"#01 onlineusers #"+pc++);
  try {
    let email2 = dbvalidator.checkData(email);
    let token2 = dbvalidator.checkData(token);
    let promise1 = [await email2, await token2];
    let email3 = promise1[0];
    let token3 = promise1[1];
    let hashData = dbvalidator.db3hashData(email3+"+"+token3);
    if((email3 == "") || (token3 == "") || (email3 == null) || (token3 == null)){
      console.log(dbvalidator.dbTime()+" onlineusers 0000..."+pc++, email3);
      return 0;
    }
    let sqlString = 'INSERT INTO onlineusers (email, token) VALUES ($1, $2)';
    let token4 = await hashData;
    let sqlValues = [email3, token4];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" onlineusers dberror: "+pc++, err);
        return 0;
      } else {
        console.log(email3, token4);
        let resultsRows = results["rows"];
        let resultsLength = results["rows"].length;
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        console.log(resultsRows);
        return dblogin2;
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#05 onlineusers : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#06 onlineusers Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"### 07 ### onlineusers Done: ###"+pc++);
};

let onlineLogout = async (req, res) => {
  console.log(dbvalidator.dbDateTime()+"#01 onlineLogout #"+pc++);
  try {
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
       res.json({Logout: 0, Users: "dataError"+pc++, Time: dbvalidator.dbTime(), Token: "#0001", Error: "error: "+pc});
       console.log(dbvalidator.dbTime()+" Done 0000..."+pc++, email3);
       return 0;
     }
    let token4 = await hashData;
    db.pool.query('DELETE FROM onlineusers WHERE email = $1 AND token = $2', [email3, token4], (err, resp) => {
      if (err) {
        console.log(dbvalidator.dbTime()+" onlineusers dberror: "+pc++, err);
        res.json({Logout: 0, OnlineUsers: "dataError"+pc++, Time: dbvalidator.dbTime(), Token: "#0001", Error: "error: "+pc});
        return 0;
      } else {
        console.log(resp.rows);
        res.json({Logout: 1, OnlineUsers: resp.rows, Time: dbvalidator.dbTime(), Error: "error: "+pc});
        return 1;
      }
    });
  } catch (e) {
    console.log(dbvalidator.dbTime()+"#05 onlineusers : "+pc++, e);
  } finally {
    console.log(dbvalidator.dbTime()+"#06 onlineusers Done: "+pc++);
  }
  console.log(dbvalidator.dbTime()+"### 07 ### onlineusers Done: ###"+pc++);
};

module.exports = {
  onlineUsers,
  onlineLogin,
  onlineLogout
}

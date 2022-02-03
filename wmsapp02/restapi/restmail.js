////////////////////////////////////////////
//
// restmail.js
// Author: Brian M
//
///////////////////////////////////////////


const dbvalidator = require('../services/dbvalidators');
const dbemail = require('../services/wmsmail');
let pc = 0;
let pc2 = 0;

const postMail = async (name, email, subject, message) => {
  try {
    console.log(dbvalidator.dbDate()+"#1 Post mail# "+pc2++);
    dbemail.sendEmail(name, email, subject, message);
  } catch (e) {
    console.log(dbvalidator.dbDate()+"#2 Post mail# "+pc2++);
  } finally {
    console.log(dbvalidator.dbDate()+"#3 Post mail# "+pc2++);
  }
}

module.exports = {
  postMail
}

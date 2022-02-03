const nodemailer = require("nodemailer");
const MailComposer = require("nodemailer/lib/mail-composer");
const config = require('../configs');

var mail;
var mailConfig;
var user = config.wmsmail.user;
var pwd = config.wmsmail.pwd;
var wmsemail = config.wmsmail.email;
var mailOptions;
var stream;
var line = "\n---------------\n===============\n---------------";

mailConfig = {
  host: config.wmsmail.host,
  port: config.wmsmail.port,
  auth: {
    user: user,
    pass: pwd
  },
  streamTransport: false,
};

var message = {
  msg: `<pre>
Hello There

Wmsapp...

Regards

Wmsapp

wmsemail
----------------------
======================
----------------------
</pre>
<hr>
<pre>
wmsapp
</pre>
<hr>
<pre>
Wmsapp
wmsemail
</pre>`,
msg2: wmsemail,
};

mailOptions = {
  from: '"Info" <'+wmsemail+'>',
  to: '"Info" <'+wmsemail+'>',
  cc: wmsemail,
  subject: "Info wmsapp.",
  html: message.msg+" \n"+message.msg2+" \n"+line,
};

async function sendMessage(data) {
  try {
    console.log("sendMessage: ", data);
    var transporter = nodemailer.createTransport(mailConfig);
    var info = await transporter.sendMail(data);
    console.log("Message sent: %s", info.messageId);
    console.log("Info: %s", info);
    console.log("Envelope: %s", info.envelope);
    console.log("Message: %s", info.message);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Done: ", new Date());
  }
}

async function sendEmail(name, email, mailSubject, messageData) {
  try {
    var emailData = {
      from: '"Info" <'+wmsemail+'>',
      to: '"'+name+'" <'+email+'>',
      cc: wmsemail,
      subject: mailSubject,
      html: "Hello, "+name+" \n"+messageData+" \n"+line,
    };
    console.log("sendMessage: ", emailData);
    var transporter = nodemailer.createTransport(mailConfig);
    var info = await transporter.sendMail(emailData);
    console.log("Message sent: %s", info.messageId);
    console.log("Info: %s", info);
    console.log("Envelope: %s", info.envelope);
    console.log("Message: %s", info.message);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Done: ", new Date());
  }
}

async function main() {
  mail = new MailComposer(mailOptions);
  mail.compile().build(function(err, data){
    process.stdout.write(data);
    sendMessage(mailOptions);
  });
  var d = new Date();
  return {"mailDone": d};
}

main().then(console.log)
  .catch(console.error);

module.exports = {
  sendMessage,
  sendEmail
}

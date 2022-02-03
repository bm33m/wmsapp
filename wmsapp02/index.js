//
// index.js
//

const express = require('express');
let pem = require('pem');
let http = require('http');
let https = require('https');
let url = require('url');
let fs = require('fs');
let cors = require('cors');
let bodyParser = require('body-parser');
const path = require('path');
const restusers = require('./restapi/restusers');
const onlineusers = require('./restapi/onlineusers');
const restproducts = require('./restapi/restproducts');
const restcategories = require('./restapi/restcategories');
const restmail = require('./restapi/restmail');

const app = express();
app.use(cors())

let pc = 0;
let now = new Date();
let appport = 9080;
let httpsport = 9090;
let httpsServer;
let dt = dbTime();
let wmsd01 = 'https://localhost:9090';
let wmsd02 = 'http://localhost:4200';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(express.static(__dirname+'/src'));
app.use(express.static(__dirname+'/dist/wmsapp02'));

function dbTime(){
  now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
}

app.set('port', (process.env.PORT || appport));

app.use(function(req, res, next){
  res.header("Acces-Control-Allow-Origin", wmsd02);
  res.header("Acces-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  console.log(dbTime()+" index#"+ pc++);
  //res.sendFile(path.join(__dirname, '/src/index.html'));
  res.sendFile(path.join(__dirname+'/dist/wmsapp02/index.html'));
});

app.get('/download', function(req, res) {
  console.log("Download: "+ dbTime() +", download: "+", #: "+ pc++);
  res.download('info/filelink/info.txt');
});

let images = ["1002.jpg", "1004.jpg", "special.jpg"];
app.get('/imagelink', function(req, res) {
  console.log("imagelink: "+ dbTime() +", #: "+pc++);
  res.sendFile(path.join(__dirname, '/info/imagelink/'+randImages()));
  //res.send('info/imagelink/1002.jpg');
});

app.get('/imagelink/:id', function(req, res) {
  let url2 = req.url;
  console.log("imagelink: "+ dbTime() +"\n#url:"+url2+" \n#: "+pc++);
  res.sendFile(path.join(__dirname, '/info/imagelink/'+randImages()));
});

let randImages = () => {
  let x = Math.random();
  let y = Math.floor(x * 300);
  let z = images.length;
  let xyz = y % z;
  console.log("x: "+x+", y: "+y+", z: "+z+"\n#xyz: y%z = "+xyz)
  return images[xyz];
}

app.get('/logout', function(req, res) {
  let pd = pc++;
  console.log("Exit: "+ dbTime()+", #: "+ pc++);
});

app.use('/api/register', restusers.postUsers);
app.use('/api/login', restusers.loginUsers);
app.use('/api/logout', onlineusers.onlineLogout);

app.use('/api/products', restproducts.postProducts);
app.use('/api/productslist', restproducts.getProducts);
app.use('/api/updateproducts', restproducts.putProducts);
app.use('/api/deleteproducts', restproducts.deleteProducts);
app.use('/api/downloadproducts', restproducts.downloadProducts);

app.use('/api/categories', restcategories.postCategories);
app.use('/api/categorieslist', restcategories.getCategories);
app.use('/api/updatecategories', restcategories.putCategories);

app.use('/api/email', restmail.postMail);

app.get('/info/:id', function (req, res, next) {
  let dbt = dbTime();
  let url2 = req.url;
  console.log(dbt+"# url: "+url2);
  res.json({info: dbt+'# wmsapp02, '+url2})
});

let pport = app.get('port');
app.listen(pport, function() {
  console.log('App is now running at : localhost:'+pport+'/');
  console.log('Hit CTRL-C to stop the server');
  console.log(now);
});

function httpsApp(vhost){
  try {
    pem.createCertificate({days: 7, selfSigned: true}, function(err, keys) {
      var options = {
        key: keys.serviceKey,
        cert: keys.certificate
      };
      httpsServer = https.createServer(options, app);
      httpsServer.listen(httpsport);
      console.log('App2 is now running at: '+vhost+':'+httpsport+'/');
      var pemcert = options.key+"\n"+options.cert;
      dt = dbTime();
      console.log("DT: "+dt+", "+now, pemcert);
      fs.writeFileSync('appinfo/pcert.pem', pemcert);
    });
  } catch (e) {
    dt = dbTime();
    console.log(now, "httpsApp: "+e);
  } finally {
    dt = dbTime();
    console.log(now, "httpsApp: "+pc++);
  }
}

httpsApp(wmsd01);

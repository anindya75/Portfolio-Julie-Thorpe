
var fs = require ("fs");
var express =  require("express");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// app.get('/', function(req, res){
// 	res.sendFile(__dirname + '/index.html');
// });

app.post('/update/', function (req, res){
  console.log(req.body);
  MongoClient.connect(url, function(err, db) {
    dbo = db.db("mydb");
    dbo.collection("biowebpage").insertOne(req.body, function(err, res) {
      if (err) throw err;
      console.log('Saved in DB!');   
      db.close();
    });
    res.send("Your data is saved in DB.")
  });
});

  app.post('/update2/', function (req, res){
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
      dbo = db.db("mydb");
      dbo.collection("contactwebpage").insertOne(req.body, function(err, res) {
        if (err) throw err;
        console.log('Saved in DB!');   
        db.close();
      });
      res.send("Your data is saved in DB.")
    });
});

app.get('/data/', function (req, res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("mydb");
    dbo.collection("biowebpage").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });
});

  app.get('/data2/', function (req, res){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      dbo = db.db("mydb");
      dbo.collection("contactwebpage").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
        db.close();
      });
    });
  });


//   fs.readFile('myfile.txt', 'utf8', function(err, contents) {
//   console.log(contents);
//   res.json(JSON.parse(contents));
// });
//});

app.listen(8080);

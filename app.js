var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());



app.get('/', function(req,res){
  res.send("Sample Code for RESTful API");
})

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })

app.get ('/showbyID/:id', function (req, res){
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    var users = JSON.parse( data );
    var user = users[req.params.id] 
    console.log(user);
    res.end(JSON.stringify(users[req.params.id]));
  });
})

app.post('/addUser', function (req, res) {
  // First read existing users.
  var json = req.body;
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     data = JSON.parse( data );
     var i = Object.keys(data).length + 1;
     data[i] = json;
    //  console.log( data );
     res.end(JSON.stringify(data));
  });
})

app.delete('/delete/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    var users = JSON.parse( data );
    delete users[req.params.id];
      
    console.log( users );
    res.end( JSON.stringify(users));
  });
})

// app.post('/addMultiUser', function (req, res) {
//   // First read existing users.
//   var json = req.body;

//   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
//      var newUsers = JSON.parse( data );
//      var i = Object.keys(data).length + 1;
//      for(i in json){
//        new[i]: {
//         "name": newUsers[i].name,
//         "password": newUsers[i].password,
//         "profession": newUsers[i].profession,
//         "id": Object.keys(data).length + 1 +
//        }
//      }
//      data[i] = req.body;
//      console.log( data );
//      res.end(JSON.stringify(data));
//   });
// })

var server = app.listen(8080, function(){
  var port = server.address().port

  console.log("Sample Code for RESTful API run at ", port)
})

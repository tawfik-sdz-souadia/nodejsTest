const express = require("express");
var users = require('./users');

const app = express();

const port = 3000;

var reponse = 'hello ';
//import router from birds file
app.use('/users', users);

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`);
});

var request_time = function (req, res, next) {
    req.requestTime = new Date();
    next();
  }
  
app.use(request_time);

app.get('/',function(req,res,next){
    console.log("Original url := "+req.originalUrl+"\n","Request's method := "+req.method);
    next();
},function(req,res,next){
    var responseText = 'Hello World!<br>';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
    next();
});

  
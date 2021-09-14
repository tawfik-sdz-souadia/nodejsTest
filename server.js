const http = require('http');
const fs = require('fs');
const m = require('./utils');
const _ = require("lodash");

const server = http.createServer((req,res) => {
    console.log('Server started');
    console.log(_.random(0,100));
    let path = './views/';
    let statusCode = 200;
    switch (req.url) {
        case "/":
            path += "index.html";
            break;
        case "/about":
            path += "about.html";
            break;
        case "/about-us":
            res.writeHead(301,{'Content-Type': 'text/html','Location' : '/about'});
            res.end();
            break;
        default:
            statusCode = 404;
            path += "404.html";
            break;
    }
    res.writeHead(statusCode,{'Content-Type': 'text/html'});
    fs.readFile(path,(err,data) => {
        if(err){
            console.log(err);
        }
        else{
            res.write(data.toString());
            res.end();
        }
    }); 
 
});

server.listen(3000,'localhost',() => {
    console.log('listening for requests in port 3000');
})
const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require("./models/user");
const app = express();

const port = 3000;


const dbURI = "mongodb://toufik:tawfiksdz158@127.0.0.1:27017/test";
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true}).then((result) => {
    console.log('connected to db');
    app.listen(port,() => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}).catch((err) =>  { console.log(err); });
//register view engines
app.set('view engine','ejs');
app.set('views','templates');



app.use(morgan('dev'))

let generateRandomName = (length) => {
    var result = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

app.get('/',(req,res) => {
    let username_length = 1 + Math.floor(Math.random() * 5);
    console.log(username_length);
    const user  =  new User({
        username : generateRandomName(username_length),
        password : generateRandomName(username_length+5)
    });
    user.save().then((res) => {
        console.log(res);
    }).catch((err) => { 
        console.log(err);
    });
  res.render('index',{name:'Toufik'});
});

app.get('/about',(req,res,next) => {
    res.render('about');
});

app.get('/all-users',(req,res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((err) => {
        console.log(err);
    })
})

app.use((req,res) => {
    res.status(404).sendFile('./views/404.html',{root:__dirname});
})
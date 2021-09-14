const express = require("express");

const app = express();

const port = 3000;

//register view engines
app.set('view engine','ejs');
app.set('views','templates');

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/',(req,res) => {
    const users = [
        {name:'A',password:'AD4ds?dsq'},
        {name:'B',password:'Bf45z'},
        {name:'C',password:'Casop7xxx'},
        {name:'D',password:'75sDsa'}
    ];
  res.render('index',{name:'Toufik',users});
});

app.get('/about',(req,res,next) => {
    res.render('app');
});

app.use((req,res) => {
    res.status(404).sendFile('./views/404.html',{root:__dirname});
})